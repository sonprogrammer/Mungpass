


interface StoreInfoFormProps {
  onPrev: () => void;
  onComplete: (data: any) => void;
}

export function StoreInfoForm({ onPrev, onComplete }: StoreInfoFormProps) {

//   TODO 카카오맵 켜기

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-slate-600 ml-1">가게 주소</label>
        <div className="flex gap-2">
          <input
            readOnly
            placeholder="주소 검색을 눌러주세요"
            className="flex-1 bg-slate-50 border-orange-100 border-2 rounded-2xl px-4 py-3 text-sm focus:outline-none"
          />
          <button
            className="bg-orange-500 text-white px-4 rounded-2xl text-sm font-bold shrink-0"
          >
            검색
          </button>
        </div>
      </div>


      
      {/* TODO 사업자번호 사진 추가하는거 -> 내 이메일로 보내게 해야함, 내가 멍패스 관리자니깐  */}

      <div className="flex gap-3 mt-4">
        <button onClick={onPrev} className="flex-1 py-4 text-slate-400 font-bold">이전</button>
        <button 
          className="flex-2 bg-orange-500 text-white rounded-2xl font-bold"
        >
          등록 완료
        </button>
      </div>
    </div>
  );
}