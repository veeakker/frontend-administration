export default function propertyType(model, property) {
  const ctr = model.constructor;
  return ctr && ctr.knownProperties && ctr.knownProperties[property];
}
