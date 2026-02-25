
import { useFormStatus } from 'react-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus();


  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-orange-500 hover:bg-orange-700 disabled:bg-orange-400 cursor-pointer text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2"
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {isLogin ? '접속하기' : '가입 완료하기'}
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  );
}