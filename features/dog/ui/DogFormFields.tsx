import { DogFormFieldsProps } from "@/features/dog/model/types";
import { Camera } from "lucide-react";


export function DogFormFields({ formData, setFormData, imagePreview, onImageChange, fileInputRef }: DogFormFieldsProps) {

    return (
        <div className="space-y-5">

            <div className="flex flex-col items-center justify-center mb-4">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-32 h-32 rounded-[2.5rem] bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden group"
                >
                    <img
                        src={imagePreview || formData?.image_url || "/icon.png"}
                        alt={"강아지 프로필 사진"}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity ${!imagePreview || formData?.image_url  ? 'opacity-50' : 'opacity-100'}`}
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
                        <Camera className={`w-8 h-8 ${imagePreview || formData?.image_url ? 'text-slate-700 drop-shadow-md' : 'text-slate-400'} mb-1`} />
                        <span className={`text-[10px] font-bold ${imagePreview || formData?.image_url  ? 'text-slate-700 font-black drop-shadow-md' : 'text-slate-400'}`}>
                            {imagePreview || formData?.image_url ? '사진 변경' : '사진 추가'}
                        </span>
                    </div>

                    {imagePreview && (
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onImageChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>


            <div>
                <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">이름</label>
                <input
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div>
                <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">품종</label>
                <input
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-400 outline-none"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                />
            </div>

            <div>
                <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">몸무게(kg)</label>
                <input
                    type="number"
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                />
            </div>

            <div>
                <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">생일</label>
                <input
                    type="date"
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                />
            </div>

            <div>
                <label className="text-xs font-black text-slate-400 ml-1 mb-1 block">특징</label>
                <textarea
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none resize-none"
                    value={formData.description}
                    placeholder="성격이나 건강 상태 등 특이사항을 적어주세요"
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
        </div>
    )
}