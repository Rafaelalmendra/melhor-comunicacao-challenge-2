import Image from 'next/image';

const NoDataTable = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-8">
      <Image
        src="/no-data.svg"
        width={264}
        height={264}
        objectFit="contain"
        alt="Imagem de produto não encontrado"
      />
      <h1 className="text-3xl mt-4">Nenhum produto encontrado</h1>
      <p className="text-slate-500 mt-1">
        Adicione algum produto para visualiza-lo aqui!
      </p>
    </div>
  );
};

export { NoDataTable };
