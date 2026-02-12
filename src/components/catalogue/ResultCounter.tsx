interface ResultCounterProps {
  count: number;
}

export function ResultCounter({ count }: Readonly<ResultCounterProps>) {
  return (
    <span className="text-sm text-gray-600">
      {count} produit{count === 1 ? '' : 's'}
    </span>
  );
}
