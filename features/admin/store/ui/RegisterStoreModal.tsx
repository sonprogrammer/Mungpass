'use client'

import { Shop } from "@/entities/admin/inquiry/model";
import { useGetUnregisOwner, usePostUnregisOwner } from "@/features/admin/store/model";
import { SearchStoreSection } from "@/features/admin/store/ui/SearchStoreSection";
import { useSearchShops } from "@/features/search-shop/model";
import { KakaoPlace, useMyLocation } from "@/shared/model";
import { App, Button, Descriptions, Form, Input, Modal, Select, Steps, Switch } from "antd";
import { useMemo, useState } from "react";

interface RegisterStoreModalProps {
  open: boolean
  onClose: () => void
}

export function RegisterStoreModal({ open, onClose }: RegisterStoreModalProps) {
  const [form] = Form.useForm()
  const [showMap, setShowMap] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [activePlace, setActivePlace] = useState<KakaoPlace | null>(null)
  const [selectedOwnerId, setSelectedOwnerId] = useState<string | null>(null)
  const [mode, setMode] = useState<'owner' | 'store' | 'check'>('owner')

  // *검색 훅
  const { data: searchData, isPending } = useSearchShops(keyword)
  //* 현재 내위치 가져오기 
  const { data: myLocation, isLoading: isMyLocationLoading } = useMyLocation()
  // * 매장등록안한 사장 가져오기
  const { data: unregisOwner, isPending: ownerLoading } = useGetUnregisOwner()
  //* 매장 등록 
  const { mutate: registerStore, isPending: isSubmitting } = usePostUnregisOwner()

  const displayCenter = useMemo(() => {
    if (keyword && searchData?.[0]) return { lat: Number(searchData[0].y), lon: Number(searchData[0].x) }
    return myLocation
  }, [keyword, searchData, myLocation])


  const handleKeywordChange = (newKeyword: string) => {
    setKeyword(newKeyword)
    setActivePlace(null)
  }

  const { message } = App.useApp()

  const handlePlaceClick = (place: KakaoPlace) => {

    form.setFieldsValue({
      name: place.place_name,
      address: place.address_name,
      kakao_place_id: place.id,
      shops_phone: place.phone
    })
    setShowMap(false)
    setActivePlace(null)
    message.success(`${place.place_name} 정보가 자동으로 입력되었습니다.`)
  }

  const handleNext = async () => {
    if (mode === 'owner') {
      if (!selectedOwnerId) {
        message.warning('사장님을 선택해주세요')
        return
      }
      setMode('store')
    } else if (mode === 'store') {
      try {
        await form.validateFields(['name', 'address', 'kakao_place_id'])
        setMode('check')
      } catch {
        message.warning('필수 항목을 입력해주세요')
      }
    }
  }


  const handleSubmit = async () => {
    const values = form.getFieldsValue() as Shop
    const payload = {
      ...values,
      owner_id: selectedOwnerId as string, // state에서 직접 가져와 보장
      kiosk_enabled: !!values.kiosk_enabled,
      is_member: !!values.is_member,
    }

    registerStore(payload, {
      onSuccess: () => {
        message.success('매장이 등록되었습니다')
        form.resetFields()
        setMode('owner')
        setSelectedOwnerId(null)
        onClose()
      },
      onError: () => {
        message.error('등록 실패하였습니다')
      }
    })
  }

  const handleClose = () => {
    form.resetFields()
    setMode('owner')
    setSelectedOwnerId(null)
    setActivePlace(null)
    setKeyword('')
    onClose()
  }

  const selectedOwner = unregisOwner?.find(o => o.id === selectedOwnerId)
  const formValues = form.getFieldsValue()


  const stepItems = [
    { title: '사장님 선택' },
    { title: '매장 정보' },
    { title: '최종 확인' },
  ]

  const currentStep = mode === 'owner' ? 0 : mode === 'store' ? 1 : 2

  return (
    <Modal
      title='신규 지점 등록'
      open={open}
      onCancel={onClose}
      destroyOnHidden={true}
      width={'70%'}
      footer={null}
      centered
    >

      <Steps items={stepItems} current={currentStep} className="mb-8" />

      <Form form={form} layout="vertical">
        {/* {mode === 'owner' && ( */}
          <div className={mode !== 'owner' ? 'hidden' : ''}>

            <Form.Item name="owner_id" label="사장님 선택" rules={[{ required: true }]}>
              <Select showSearch
                placeholder="사장님 이름을 검색해주세요"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                loading={ownerLoading}
                options={unregisOwner?.map(owner => ({
                  label: `${owner.name} (${owner.email})`,
                  value: owner.id
                }))}
                onChange={(value) => {
                  setSelectedOwnerId(value);
                  form.setFieldValue('owner_id', value);
                }}
              />
            </Form.Item>
          </div>
        {/* // // )} */}
        {/* {mode === 'store' && ( */}
          <div className={mode !== 'store' ? 'hidden' : ''}>

            {/* <Button onClick={() => setShowMap(!showMap)} className='mb-4'>
              {showMap ? '지도 닫기' : '매장 검색하기'}
            </Button> */}

            <SearchStoreSection
              displayCenter={displayCenter}
              searchData={searchData}
              activePlace={activePlace}
              selectedOwnerId={selectedOwnerId}
              onKeywordChange={handleKeywordChange}
              onPlaceClick={handlePlaceClick}
              onMarkerClick={setActivePlace}
            />
            {/* <AnimatePresence>
              {showMap && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center justify-center mb-6"
                >
                  <div className="flex flex-col gap-4">
                    <StoreSearchWidget handleKeywordChange={(k) => { setKeyword(k); setActivePlace(null); }} />

                    {displayCenter && (
                      <div className="h-100">
                        <MapContainer
                          center={displayCenter}
                          places={searchData || []}
                          onMarkerClick={setActivePlace}
                        />
                      </div>
                    )}

                    {activePlace && selectedOwnerId ? (
                      <SelectedStore
                        place={activePlace}
                        onNext={() => handlePlaceClick(activePlace)}
                        ownerId={selectedOwnerId}
                      />
                    ) : (
                      <div className="p-3 bg-orange-50 text-orange-600 text-sm font-bold rounded-lg text-center">
                        {!selectedOwnerId ? "먼저 사장님을 선택해주세요" : "지도의 마커를 클릭하여 매장을 선택하세요"}
                      </div>
                    )}
                  </div>

                </motion.div>
              )}
            </AnimatePresence> */}
            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="name" label="매장명" rules={[{ required: true }]} preserve={true}><Input /></Form.Item>
              <Form.Item name="address" label="주소" rules={[{ required: true }]} preserve={true}><Input /></Form.Item>
              <Form.Item name="shops_phone" label="매장 전화번호" preserve={true}><Input /></Form.Item>
              <Form.Item name="business_number" label="사업자 번호" preserve={true}><Input /></Form.Item>
              <Form.Item name="kakao_place_id" label="카카오 장소 ID" preserve={true}><Input readOnly /></Form.Item>

            </div>

            <div className="flex items-center gap-8 py-4">
              <Form.Item name="kiosk_enabled" label="키오스크 사용" valuePropName="checked" preserve={true}><Switch /></Form.Item>
              <Form.Item name="is_member" label="유료 회원 여부" valuePropName="checked" preserve={true}><Switch /></Form.Item>
            </div>
          </div>
        {/* )} */}

        {/* {mode === 'check' && ( */}
          <div className="flex flex-col gap-6 mode !== 'store' ? 'hidden' : ''">
            <Descriptions title="사장님 정보" bordered column={2}>
              <Descriptions.Item label="이름">{selectedOwner?.name}</Descriptions.Item>
              <Descriptions.Item label="이메일">{selectedOwner?.email}</Descriptions.Item>
              <Descriptions.Item label="전화번호">{selectedOwner?.phone_number}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="매장 정보" bordered column={2}>
              <Descriptions.Item label="매장명">{formValues.name}</Descriptions.Item>
              <Descriptions.Item label="주소">{formValues.address}</Descriptions.Item>
              <Descriptions.Item label="전화번호">{formValues.shops_phone}</Descriptions.Item>
              <Descriptions.Item label="사업자 번호">{formValues.business_number}</Descriptions.Item>
              <Descriptions.Item label="카카오 장소 ID">{formValues.kakao_place_id}</Descriptions.Item>
              <Descriptions.Item label="키오스크">{formValues.kiosk_enabled ? '사용' : '미사용'}</Descriptions.Item>
              <Descriptions.Item label="유료 회원">{formValues.is_member ? '예' : '아니오'}</Descriptions.Item>
            </Descriptions>
          </div>
        {/* )} */}


      </Form>

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => {
            if (mode === 'store') setMode('owner')
            else if (mode === 'check') setMode('store')
          }}
          disabled={mode === 'owner'}
        >
          이전
        </Button>
        <div className="flex gap-2">
          <Button onClick={handleClose}>취소</Button>
          {mode !== 'check' ? (
            <Button type="primary" onClick={handleNext}>다음</Button>
          ) : (
            <Button type="primary" onClick={handleSubmit} loading={isSubmitting}>등록하기</Button>
          )}
        </div>
      </div>



    </Modal>
  )
}