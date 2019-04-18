import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import { BookDetails } from '../../models/books.model';

import './BookDetailsCard.scss';

type Props = {
  bookDetails: BookDetails;
};

export const BookDetailsCard = (props: Props) => {
  const { bookDetails } = props;

  return (
    <Card className="bookDetailsCard-card">
      <div style={{ display: 'flex' }}>
        <img
          src={
            bookDetails.volumeInfo.imageLinks
              ? bookDetails.volumeInfo.imageLinks.thumbnail
              : 'https://via.placeholder.com/128?text=No%20Image'
          }
          alt=""
        />
        <CardActionArea href={bookDetails.volumeInfo.previewLink}>
          <CardContent className="bookDetailsCard-cardContent">
            <Typography component="h5" variant="h5">
              {bookDetails.volumeInfo.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {bookDetails.volumeInfo.authors && bookDetails.volumeInfo.authors[0]}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {bookDetails.volumeInfo.publishedDate}
            </Typography>
          </CardContent>
        </CardActionArea>
      </div>
    </Card>
  );
};

export default BookDetailsCard;
