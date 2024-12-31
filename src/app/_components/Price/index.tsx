'use client';

import React, { useState, useEffect } from 'react';

import { Product } from '../../../payload/payload-types';
import { AddToCartButton } from '../AddToCartButton';
import { RemoveFromCartButton } from '../RemoveFromCartButton';

import classes from './index.module.scss';

export const Price: React.FC<{
  product: Product;
  quantity?: number;
  button?: 'addToCart' | 'removeFromCart' | false;
}> = props => {
  const { product, button = 'addToCart', quantity = 1 } = props;
  const { priceJSON } = product;

  const [priceDisplay, setPriceDisplay] = useState<{
    totalPrice: string;
    breakdown: string;
  }>({
    totalPrice: '',
    breakdown: '',
  });

  useEffect(() => {
    if (priceJSON) {
      const total = (Number(priceJSON) * quantity).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      const breakdown = `${Number(priceJSON).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })} x ${quantity}`;
      
      setPriceDisplay({
        totalPrice: total,
        breakdown: quantity > 1 ? breakdown : '',
      });
    }
  }, [priceJSON, quantity]);

  return (
    <div className={classes.actions}>
      {priceJSON && (
        <div className={classes.price}>
          <p>{priceDisplay.totalPrice}</p>
          {priceDisplay.breakdown && (
            <small className={classes.priceBreakdown}>{priceDisplay.breakdown}</small>
          )}
        </div>
      )}
      {button === 'addToCart' && <AddToCartButton product={product} appearance="default" />}
      {button === 'removeFromCart' && <RemoveFromCartButton product={product} />}
    </div>
  );
};
