/**
 * Created by Lenovo on 2017/8/15.
 */
import {Injectable} from '@angular/core';
import {Api} from './api';
import 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import {Holder} from './holder';
import {Matrix}from '../provider/Matrix'
import {letProto} from "rxjs/operator/let";
@Injectable()
export class LinearAlgebra {

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
      let i, j, m, n, s, t, k = 1;
      let N = matrix.row;
      let f = 1, c, x, det = 0;
      for (i = 0, j = 0; i < N && j < N; i++, j++) {
        if (matrix.matrix[i][j] == 0) {
          for (m = i; m < matrix.row && matrix.matrix[m][j] == 0; m++);
          if (m == N) {
            det = 0;
            return det;
          } else
            for (n = j; n < N; n++) {
              c = matrix.matrix[i][n];
              matrix.matrix[i][n] = matrix.matrix[m][n];
              matrix.matrix[m][n] = c;
            }
          k *= (-1);
        }
        for (s = N - 1; s > i; s--) {
          x = matrix.matrix[s][j];
          for (t = j; t < N; t++)
            matrix.matrix[s][t] -= matrix.matrix[i][t] * (x / matrix.matrix[i][j]);
        }

      }
      for (i = 0; i < N; i++)
        f *= matrix.matrix[i][i];
      det = k * f;
      return det;
    }
    else {
      return null;
    }
  }

  //求伴随矩阵
  getAdjoint(matrix: Matrix) {
    if (this.isSquareMatrix(matrix)) {
      let matrix_z: number[][][] = [];
      for (let k = 0, z = 0; k < matrix.row && z < matrix.row * matrix.col; k++) {
        for (let K = 0; K < matrix.col; K++) {
          matrix_z.push([[]]);
          //let tempMatrix_z:number[][] = [];
          for (let i5 = 0, m5 = 0; i5 < matrix.row && m5 < matrix.row - 1; i5++) {
            for (let p = 0, M = 0; p < matrix.col && M < matrix.col - 1; p++) {
              if (p != K) {
                if (matrix_z[z][M] == null) {
                  matrix_z[z].push([0]);
                }
                if ((i5 + p) % 2 == 0) {
                  matrix_z[z][M][m5] = matrix.matrix[i5][p];
                  M++;
                } else {
                  matrix_z[z][M][m5] = -matrix.matrix[i5][p];
                  M++;
                }
              }
            }
            if (i5 != k)
              m5++;
          }
          z++;
        }
      }

      let resultArr: number[][] = [];
      for (let r = 0, count = 0; r < matrix.row; r++) {
        resultArr.push([0]);
        for (let c = 0; c < matrix.col; c++, count++) {
          resultArr[r][c] = this.getDetaminate(new Matrix(matrix_z[count]));
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
