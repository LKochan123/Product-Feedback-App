export enum SortingFeedbackEnum {
  MOST_UPVOTES = 'Most upvotes',
  LEAST_UPVOTES = 'Least upvotes', //ogolnie przyjelo sie, ze nie korzystamy ze spacji w tego typu miejscach. Mogą np. na backu wystąpić problemy. Raczej zrobiłbym klucz w formie stringa, np.LEAST_UPVOTES.
  MOST_COMMENTS = 'Most comments',
  LEAST_COMMENTS = 'Least comments',
  DEFAULT = 'Default',
}
