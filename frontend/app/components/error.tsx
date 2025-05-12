type Props = {
  message: string;
};

export function Error({ message }: Props) {
  return <div>Error: {message}</div>;
}
