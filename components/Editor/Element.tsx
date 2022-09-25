import type { FC, ReactNode } from "react";

export type ElementProps = {
  attributes: any;
  children: ReactNode;
  element: any;
};

export const Element: FC<ElementProps> = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    case 'table': 
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );

    case 'table-row':
      return (
        <tr {...attributes}>{children}</tr>
      );
    case 'table-cell':
      return (
        <td {...attributes}>{children}</td>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}
