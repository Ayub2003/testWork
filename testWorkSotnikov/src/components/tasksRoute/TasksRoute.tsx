import React, { FC, useState } from "react";
import ReactDataSheet from "react-datasheet";
import { Cell } from "react-datasheet-grid/dist/types";
// Be sure to include styles at some point, probably during your bootstrapping
import "react-datasheet/lib/react-datasheet.css";

import styles from "./TasksRoute.module.scss";

export interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: number | null;
}

let cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = (
  props
) => {
  const backgroundStyle =
    props.cell.value && props.cell.value < 0
      ? { backgroundColor: "red" }
      : undefined;
  return (
    <td
      style={backgroundStyle}
      onMouseDown={props.onMouseDown}
      onMouseOver={props.onMouseOver}
      onDoubleClick={props.onDoubleClick}
      className="cell"
    >
      {props.children}
    </td>
  );
};

class MyReactDataSheet extends ReactDataSheet<GridElement, number> {}

export const TasksRoute: FC = () => {
  const [grid, setGrid] = useState<GridElement[][]>([
    [{ value: 1 }, { value: 3 }],
    [{ value: 2 }, { value: 4 }],
    [{ value: 2 }, { value: 4 }],
    [{ value: 2 }, { value: 4 }],
  ]);

  return (
    <MyReactDataSheet
      data={grid}
      valueRenderer={(cell) => cell.value}
      onCellsChanged={(changes) => {
        const grid2 = grid.map((row) => [...row]);
        changes.forEach(({ cell, row, col, value }) => {
          grid2[row][col] = { ...grid2[row][col], value };
        });
        setGrid(grid2);
      }}
      onSelect={(data) => {
        console.log(data);
      }}
      cellRenderer={cellRenderer}
    />
  );
};
