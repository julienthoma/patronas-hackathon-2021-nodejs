export const Name = ({ name }: { name: string }): JSX.Element => (
  <span style={{ color: name === 'BloodyM_is_back' ? 'deeppink' : 'white' }}>
    {name} {name === 'BloodyM_is_back' ? '💅' : ''}
  </span>
);
