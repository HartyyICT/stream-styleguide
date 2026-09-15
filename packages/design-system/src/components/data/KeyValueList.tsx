"use client";

import { Fragment, Children, type ReactNode } from "react";
import Divider from "../layout/Divider";
import ColumnFlexBox from "../layout/ColumnFlexBox";

export interface KeyValueListProps {
  children: ReactNode;
  gap?: number | string;
}

export default function KeyValueList({ children, gap = 1 }: KeyValueListProps) {
  const rows = Children.toArray(children);

  return (
    <ColumnFlexBox fullWidth gap={gap}>
      {rows.map((row, index) => (
        <Fragment key={index}>
          {index > 0 && <Divider />}
          {row}
        </Fragment>
      ))}
    </ColumnFlexBox>
  );
}
