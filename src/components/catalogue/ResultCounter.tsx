interface ResultCounterProps {
  count: number;
}

export function ResultCounter({ count }: ResultCounterProps) {
  return (
    <span className="text-sm text-gray-600">
      {/* TODO(i18n): products.count */}
      {count} produit{count !== 1 ? 's' : ''}
    </span>
  );
}
