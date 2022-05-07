import Model, { belongsTo } from '@ember-data/model';

export default class OfferingModel extends Model {
  @belongsTo('unit-price-specification') unitPrice;
  @belongsTo('type-and-quantity') typeAndQuantity;

  calculatePricingSync(product) {
    // TODO: Perhaps it would be simpler to convert into a (formula for)
    // price per piece and a (formula for) price per kg, and then
    // convert from there based on our target unit.

    const offering = this;
    // the product's price (specified first)
    const productPrice = product.get('unitPrice');
    const productPriceUnit = product.get('unitPrice.unit');
    const productPricePrice = product.get('unitPrice.value');
    // the product's comparison to unit (specified second)
    const productTargetUnit = product.get('targetUnit');
    const productTargetUnitUnit = product.get('targetUnit.unit');
    const productTargetUnitValue = product.get('targetUnit.value');
    // the offering's amount/unit (and optionally price)
    const offeringPriceUnit = offering.get('unitPrice.unit');
    const offeringAmount = offering.get('typeAndQuantity');
    const offeringAmountAmount = offering.get('typeAndQuantity.value');
    const offeringAmountUnit = offering.get('typeAndQuantity.unit');

    // Calculate price per piece
    let pricePerPiece; // may stay undefined!
    switch (productPriceUnit) {
      case 'C62':
        pricePerPiece = productPricePrice;
        break;
      case 'GRM':
      case 'KGM':
        if( ['GRM','KGM'].includes( productTargetUnitUnit ) )
          // we will calculate the price per piece, given that the product's
          // price is in weight and we have a target weight
          pricePerPiece =
            productPricePrice
            * productTargetUnitValue
            * productTargetUnit.gramsPerUnit
            / productPrice.gramsPerUnit; // divide last, probably better accuracy
        break;
    }

    // Calculate price per kg
    let pricePerKg; // may stay undefined!
    switch (productPriceUnit) {
      case 'GRM':
        pricePerKg = productPricePrice * 1000;
        break;
      case 'KGM':
        pricePerKg = productPricePrice;
        break;
      case 'C62':
        if( ['GRM','KGM'].includes( productTargetUnitUnit ) )
          // we will calculate the price per kg, given that the product's
          // price is in pieces, and we have a target weight
          pricePerKg =
            productPricePrice
            / productTargetUnitValue
            / ( 1000 / productTargetUnit.gramsPerUnit );
    }

    // Convert to target values
    switch (offeringAmountUnit) {
      case 'C62':
        if( pricePerPiece )
          offering.set('unitPrice.value', pricePerPiece * offeringAmountAmount);
        else
          alert("Could not calculate price, failed to find price per piece");
        break;
      case 'KGM':
        if( pricePerKg )
          offering.set('unitPrice.value', pricePerKg * offeringAmountAmount );
        else
          alert("Could not calculate price, failed to find price per KGM");
        break;
      case 'GRM':
        if( pricePerKg )
          offering.set('unitPrice.value', pricePerKg * offeringAmountAmount / 1000);
        else
          alert("Could not calculate price, failed to find price per GRM");
        break;
    }
  }
}
