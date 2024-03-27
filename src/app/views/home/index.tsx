import { Button } from 'components';

// icons
import { Plus, Smartphone } from 'lucide-react';

const HomeView = () => {
  return (
    <div className="w-full flex flex-col mt-12">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Produtos</h1>
        <Button className="flex items-center gap-2 text-base py-6">
          <div className="flex items-center">
            <Plus size={16} />
            <Smartphone size={24} />
          </div>
          ADICIONAR
        </Button>
      </div>
    </div>
  );
};

export { HomeView };
