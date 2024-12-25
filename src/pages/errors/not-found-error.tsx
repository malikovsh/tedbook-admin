import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/custom/button';

export default function NotFoundError() {
  const navigate = useNavigate();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Ehtimol! Sahifa topilmadi!</span>
        <p className="text-center text-muted-foreground">
          Siz qidirayotgan sahifa <br />
          mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Orqaga qaytish
          </Button>
          <Button onClick={() => navigate('/')}>Bosh sahifaga qaytish</Button>
        </div>
      </div>
    </div>
  );
}
