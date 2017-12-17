/**
 * Created by Lenovo on 2017/8/15.
 */
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Matrix} from '../entity/matrix';

@Injectable()
export class MatrixService {

  static canMultiply(left: Matrix, right: Matrix) {
    return left.getCol() === right.getRow();
  }

  static canAdd(left: Matrix, right: Matrix) {
    return (left.getCol() === right.getCol() && left.getRow() === right.getRow());
  }

//  矩阵转置
  static transpose(matrix: Matrix) {
    const result: number[][] = [];
    for (let r = 0; r < matrix.getCol(); r++) {
      result.push([0]);
      for (let c = 0; c < matrix.getRow(); c++) {
        result[r][c] = matrix.getMatrix()[c][r];
      }
    }
    return new Matrix(result);
  }

  // 矩阵正交化
  static getOrthogonalization(matrix: Matrix) {
    const result: number[][] = [];
    for (let r1 = 0; r1 < matrix.row; r1++) {
      result.push([0]);
      for (let c2 = 0; c2 < matrix.col; c2++) {
        let sum3 = 0;
        for (let r2 = 0; r2 < r1; r2++) {
          let sum1 = 0, sum2 = 0;
          for (let c1 = 0; c1 < matrix.col; c1++) {
            sum1 += matrix.matrix[r1][c1] * result[r2][c1];
            sum2 += result[r2][c1] * result[r2][c1];
          }
          sum3 += (sum1 / sum2) * result[r2][c2];
        }

        result[r1][c2] = matrix.matrix[r1][c2] - sum3;
      }
    }
    return new Matrix(result);
  }

// 矩阵单位化
  static getUnit(matrix: Matrix) {
    const result: number[][] = [];
    for (let r = 0; r < matrix.row; r++) {
      let sum = 0;
      result.push([0]);
      for (let c = 0; c < matrix.col; c++) {
        sum += matrix.matrix[r][c] * matrix.matrix[r][c];
      }
      for (let c = 0; c < matrix.col; c++) {
        result[r][c] = matrix.matrix[r][c] / Math.sqrt(sum);
      }

    }
    return new Matrix(result);
  }

  // 矩阵正交单位化
  static getOrthogonalUnit(matrix: Matrix) {
    return MatrixService.getUnit(MatrixService.getOrthogonalization(matrix));
  }

  //  判断是否为方形矩阵(能否求行列式)
  static isSquareMatrix(matrix: Matrix) {
    return matrix.getRow() === matrix.getCol();
  }

  static multiply(left: Matrix, right: Matrix) {
    if (MatrixService.canMultiply(left, right)) {
      const result: number[][] = [];
      for (let r = 0; r < left.getRow(); r++) {
        result.push([0]);
        for (let c = 0; c < right.getCol(); c++) {
          let sum = 0;
          for (let u = 0; u < left.getCol(); u++) {
            sum = sum + left.getMatrix()[r][u] * right.getMatrix()[u][c];
          }
          result[r][c] = sum;
        }
      }
      return new Matrix(result);
    } else {
      return null;
    }
  }

  static add(left: Matrix, right: Matrix) {
    if (MatrixService.canAdd(left, right)) {
      const result: number[][] = [];
      for (let r = 0; r < left.getRow(); r++) {
        result.push([0]);
        for (let c = 0; c < right.getCol(); c++) {

          result[r][c] = left.getMatrix()[r][c] + right.getMatrix()[r][c];

        }
      }
      return new Matrix(result);
    } else {
      return null;
    }

  }

  //  矩阵减法
  static subtract(left: Matrix, right: Matrix) {
    const tempMatrix: number[][] = [];
    for (let r = 0; r < right.getRow(); r++) {
      tempMatrix.push([0]);
      for (let c = 0; c < right.getCol(); c++) {
        tempMatrix[r][c] = -right.getMatrix()[r][c];
      }
    }
    return MatrixService.add(left, new Matrix(tempMatrix));
  }

  //  求行列式
  static getDetaminate(matrix: Matrix) {
    if (MatrixService.isSquareMatrix(matrix)) {
      let row, col, rowStep, colStep, flag = 1;
      const order = matrix.row;
      let product = 1, det = 0;
      for (row = 0, col = 0; row < order && col < order; row++, col++) {
        if (matrix.matrix[row][col] === 0) {
          for (rowStep = row; rowStep < order && matrix.matrix[rowStep][col] === 0; rowStep++) {
          }
          if (rowStep === order) {
            det = 0;
            return det;
          } else {
            for (colStep = col; colStep < order; colStep++) {
              const temp = matrix.matrix[row][colStep];
              matrix.matrix[row][colStep] = matrix.matrix[rowStep][colStep];
              matrix.matrix[rowStep][colStep] = temp;
            }
          }
          flag *= (-1);
        }
        for (let r: number = order - 1; r > row; r--) {
          const book = matrix.matrix[r][col];
          for (let c: number = col; c < order; c++) {
            matrix.matrix[r][c] -= matrix.matrix[row][c] * (book / matrix.matrix[row][col]);
          }
        }

      }
      for (row = 0; row < order; row++) {
        product *= matrix.matrix[row][row];
      }

      det = flag * product;
      return det;
    } else {
      return null;
    }
  }

  // 求伴随矩阵
  static getAdjoint(matrix: Matrix) {
    if (MatrixService.isSquareMatrix(matrix)) {
      const bufferMatrix: number[][][] = [];
      for (let stepRow = 0, step = 0; stepRow < matrix.row && step < matrix.row * matrix.col; stepRow++) {
        for (let stepCol = 0; stepCol < matrix.col; stepCol++) {
          bufferMatrix.push([[]]);
          // let tempMatrix_z:number[][] = [];
          for (let row = 0, bmCol = 0; row < matrix.row && bmCol < matrix.col - 1; row++) {
            for (let col = 0, bmRow = 0; col < matrix.col && bmRow < matrix.row - 1; col++) {
              if (col !== stepCol) {
                if (bufferMatrix[step][bmRow] === null) {
                  bufferMatrix[step].push([0]);
                }
                if ((row + col) % 2 === 0) {
                  bufferMatrix[step][bmRow][bmCol] = matrix.matrix[row][col];
                  bmRow++;
                } else {
                  bufferMatrix[step][bmRow][bmCol] = -matrix.matrix[row][col];
                  bmRow++;
                }
              }
            }
            if (row !== stepRow) {
              bmCol++;
            }
          }
          step++;
        }
      }

      const resultArr: number[][] = [];
      for (let r = 0, count = 0; r < matrix.row; r++) {
        resultArr.push([0]);
        for (let c = 0; c < matrix.col; c++, count++) {
          resultArr[r][c] = MatrixService.getDetaminate(new Matrix(bufferMatrix[count]));
        }
      }
      return MatrixService.transpose(new Matrix(resultArr));
    } else {
      return null;
    }
  }

  // 求逆矩阵
  static getInverseMatrix(matrix: Matrix) {
    if (MatrixService.isSquareMatrix(matrix)) {
      const result: Matrix = MatrixService.getAdjoint(matrix);
      const det: number = MatrixService.getDetaminate(matrix);
      if (det !== 0) {
        for (let r = 0; r < result.row; r++) {
          for (let c = 0; c < result.col; c++) {
            result.matrix[r][c] = result.matrix[r][c] / det;
          }
        }
        return result;
      } else {
        return null;
      }

    } else {
      return null;
    }
  }

  constructor() {
  }
}
