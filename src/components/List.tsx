import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'ul'>;
const List: React.FC<Props> = ({ className, children, ...props }) => (
  <ul
    className={classNames(className, 'row-auto grid gap-3 pb-6 md:grid-cols-2')}
    {...props}
  >
    {children}
  </ul>
);

export default List;