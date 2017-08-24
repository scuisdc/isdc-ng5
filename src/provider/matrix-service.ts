/**
 * Created by Lenovo on 2017/8/15.
 */
import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';
import {Matrix}from '../../entity/matrix'
import {letProto} from "rxjs/operator/let";
@Injectable()
export class matrixService {

  constructor() {
  }

  canMultiply(left: Matrix, right: Matrix) {
    return left.getCol() == right.getRow();
  }

  canAdd(left: Matrix, right: Matrix) {
    return (left.getCol() == right.getCol() && left.getRow() == right.getRow());
  }

  //判断是否为方形矩阵(能否求行列式)
  isSquareMatrix(matrix: Matrix) {
    return matrix.getRow() == matrix.getCol();
  }

  multiply(left: Matrix, right: Matrix) {
    if (this.canMultiply(left, right)) {
      let result: number[][] = [];
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

  add(left: Matrix, right: Matrix) {
    if (this.canAdd(left, right)) {
      let result: number[][] = [];
      for (let r = 0; r < left.getRow(); r++) {
        result.push([0]);
        for (let c = 0; c < right.getCol(); c++) {

          result[r][c] = left.getMatrix()[r][c] + right.getMatrix()[r][c];

        }
      }
      return new Matrix(result);
    }
    else {
      return null;
    }

  }

//矩阵转置
  transpose(matrix: Matrix) {
    let result: number[][] = [];
    for (let r = 0; r < matrix.getCol(); r++) {
      result.push([0]);
      for (let c = 0; c < matrix.getRow(); c++) {
        result[r][c] = matrix.getMatrix()[c][r];
      }
    }
    return new Matrix(result);
  }

//矩阵减法
  subtract(left: Matrix, right: Matrix) {
    let tempMatrix: number[][] = [];
    for (let r = 0; r < right.getRow(); r++) {
      tempMatrix.push([0]);
      for (let c = 0; c < right.getCol(); c++) {
        tempMatrix[r][c] = -right.getMatrix()[r][c];
      }
    }
    return this.add(left, new Matrix(tempMatrix));
  }

  //求行列式
  getDetaminate(matrix: Matrix) {
    if (this.isSquareMatrix(matrix)) {
      let row, col, rowStep, colStep, flag = 1;
      let order = matrix.row;
      let product = 1,det = 0;
      for (row = 0, col = 0; row < order && col < order; row++, col++) {
        if (matrix.matrix[row][col] == 0) {
          for (rowStep = row; rowStep < order && matrix.matrix[rowStep][col] == 0; rowStep++);
          if (rowStep == order) {
            det = 0;
            return det;
          } else
            for (colStep = col; colStep < order;colStep++) {

              let temp = matrix.matrix[row][colStep];
              matrix.matrix[row][colStep] = matrix.matrix[rowStep][colStep];
              matrix.matrix[rowStep][colStep] = temp;
            }
          flag *= (-1);
        }
        for (let r:number = order - 1; r > row; r--) {
          let book = matrix.matrix[r][col];
          for (let c:number  = col; c < order; c++)
            matrix.matrix[r][c] -= matrix.matrix[row][c] * (book / matrix.matrix[row][col]);
        }

      }
      for (row = 0; row < order; row++)
        product *= matrix.matrix[row][row];

      det = flag * product;
      return det;
    }
    else {
      return null;
    }
  }

  //求伴随矩阵
  getAdjoint(matrix: Matrix) {
    if (this.isSquareMatrix(matrix)) {
      let bufferMatrix: number[][][] = [];
      for (let stepRow = 0, step = 0; stepRow < matrix.row && step < matrix.row * matrix.col; stepRow++) {
        for (let stepCol = 0; stepCol < matrix.col; stepCol++) {
          bufferMatrix.push([[]]);
          //let tempMatrix_z:number[][] = [];
          for (let row = 0, bmCol = 0; row < matrix.row && bmCol < matrix.col - 1; row++) {
            for (let col = 0, bmRow = 0; col < matrix.col && bmRow < matrix.row - 1; col++) {
              if (col != stepCol) {
                if (bufferMatrix[step][bmRow] == null) {
                  bufferMatrix[step].push([0]);
                }
                if ((row + col) % 2 == 0) {
                  bufferMatrix[step][bmRow][bmCol] = matrix.matrix[row][col];
                  bmRow++;
                } else {
                  bufferMatrix[step][bmRow][bmCol] = -matrix.matrix[row][col];
                  bmRow++;
                }
              }
            }
            if (row != stepRow)
              bmCol++;
          }
          step++;
        }
      }

      let resultArr: number[][] = [];
      for (let r = 0, count = 0; r < matrix.row; r++) {
        resultArr.push([0]);
        for (let c = 0; c < matrix.col; c++, count++) {
          resultArr[r][c] = this.getDetaminate(new Matrix(bufferMatrix[count]));
        }
      }
      return this.transpose(new Matrix(resultArr));
    }

    else {
      return null;
    }
  }

  //求逆矩阵
  getInverseMatrix(matrix: Matrix) {
    if (this.isSquareMatrix(matrix)) {
      let result: Matrix = this.getAdjoint(matrix);
      let det: number = this.getDetaminate(matrix);
      if (det != 0) {
        for (let r = 0; r < result.row; r++) {
          for (let c = 0; c < result.col; c++) {
            result.matrix[r][c] = result.matrix[r][c] / det;
          }
        }
        return result;
      }
      else {
        return null;
      }

    }
    else {
      return null;
    }
  }

  //矩阵正交化
  getOrthogonalization(matrix: Matrix) {
    let result: number[][] = [];
    for (let r1 = 0; r1 < matrix.row; r1++) {
      result.push([0]);
      for (let c2 = 0; c2 < matrix.col; c2++) {
        let sum3: number = 0;
        for (let r2 = 0; r2 < r1; r2++) {
          let sum1: number = 0, sum2: number = 0;
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

//矩阵单位化
  getUnit(matrix: Matrix) {
    let result: number[][] = [];
    for (let r = 0; r < matrix.row; r++) {
      let sum: number = 0;
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

  //矩阵正交单位化
  getOrthogonalUnit(matrix: Matrix) {
    return this.getUnit(this.getOrthogonalization(matrix));
  }

}
