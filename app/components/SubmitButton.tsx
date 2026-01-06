
import { useFormStatus } from 'react-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

export function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 mt-4"
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