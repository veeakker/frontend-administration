const productLabels = [
  {
    uri: 'http://veeakker.be/product-labels/d9fa5ad6-0d0e-4990-b8a7-ca3a60eb3a85',
    label: 'Frozen',
    image: '/images/product-labels/diepvries.png',
  },
  {
    uri: 'http://veeakker.be/product-labels/fa0d5d40-762e-4f89-ac82-46c1a4ee00bf',
    label: 'Natuurpunt',
    image: '/images/product-labels/natuurpunt.png',
  },
  {
    uri: 'http://veeakker.be/product-labels/c9e43e38-3f7f-4116-9817-80bdede3f123',
    label: 'PintaFish',
    image: '/images/product-labels/pintafish.png',
  },
];

export default productLabels;

export function byUri(uri) {
  return productLabels.find(({ uri: labelUri }) => uri === labelUri);
}
