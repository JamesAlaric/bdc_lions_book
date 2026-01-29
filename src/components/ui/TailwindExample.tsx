export function TailwindExample() {
  return (
    <div className="p-4 bg-off-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Tailwind CSS + Emotion
      </h3>
      <p className="text-gray-600 mb-4">
        Les deux coexistent parfaitement ! Utilise Tailwind pour le layout rapide et Emotion pour les effets avancés.
      </p>
      <button className="bg-bdc-yellow hover:bg-bdc-red text-gray-800 hover:text-off-white font-semibold py-2 px-4 rounded transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
        Bouton Tailwind BDC
      </button>
    </div>
  );
}
