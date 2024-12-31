import React, { Fragment } from 'react';
import Link from 'next/link';

import { Product } from '../../../payload/payload-types';
import { Media } from '../Media';

import classes from './index.module.scss';
import { Price } from '../Price';

export const Card: React.FC<{
  alignItems?: 'center';
  className?: string;
  showCategories?: boolean;
  hideImagesOnMobile?: boolean;
  title?: string;
  relationTo?: 'products';
  doc?: Product;
}> = props => {
  const {
    showCategories,
    title: titleFromProps,
    doc,
    doc: { slug, title, categories, meta, priceJSON } = {},
    className,
  } = props;

  const { description, image: metaImage } = meta || {};

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title;
  const sanitizedDescription = description?.replace(/\s/g, ' '); // replace non-breaking space with white space
  const href = `/products/${slug}`;

  return (
    <div className={[classes.card, className].filter(Boolean).join(' ')}>
      <Link href={href} className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>
      <div className={classes.content}>
        {showCategories && hasCategories && (
          <div className={classes.leader}>
            {categories?.map((category, index) => {
              const { title: titleFromCategory } = category;
              const categoryTitle = titleFromCategory || 'Untitled category';
              const isLast = index === categories.length - 1;

              return (
                <Fragment key={index}>
                  {categoryTitle}
                  {!isLast && <Fragment>, &nbsp;</Fragment>}
                </Fragment>
              );
            })}
          </div>
        )}
        {titleToUse && (
          <h4 className={classes.title}>
            <Link href={href} className={classes.titleLink}>
              {titleToUse}
            </Link>
          </h4>
        )}
        {description && (
          <div className={classes.body}>
            <p className={classes.description}>{sanitizedDescription}</p>
          </div>
        )}
        {doc && <Price product={doc} />}

        {/* {priceJSON && <div className={classes.price}>Price: ${priceJSON}</div>} */}
      </div>
    </div>
  );
};
