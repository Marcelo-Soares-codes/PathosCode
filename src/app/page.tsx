import { CardSamples } from "@/components/CardSamples";

export default function Home() {
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col text-center">
          <input
            type="checkbox"
            value="light"
            className="toggle theme-controller"
          />
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">PathosCode</h1>
            <h1 className="text-md text-primary mb-14">
              Pesquise o código qua anatomia aqui:
            </h1>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs my-10"
            />
            <button className="btn btn-primary">Pesquisar</button>
          </div>
          <CardSamples />
        </div>
      </div>
    </main>
  );
}
