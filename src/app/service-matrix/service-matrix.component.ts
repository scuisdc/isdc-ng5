import {Component, OnInit} from '@angular/core';
import {MatrixService} from '../../provider/matrix-service';
import {Matrix} from '../../entity/matrix';

@Component({
  selector: 'app-service-matrix',
  templateUrl: './service-matrix.component.html',
  styleUrls: ['./service-matrix.component.css']
})
export class ServiceMatrixComponent implements OnInit {
  matrix1: Matrix;
  matrix2: Matrix;
  result = '';
  textarea: { matrix1: string, matrix2: string } = {matrix1: '', matrix2: ''};

  constructor(private matrixService: MatrixService) {

  }

  ngOnInit() {
  }

  matrixInit(stringMatrix: string) {
    const matrix_row: number = stringMatrix.split('\n').length;
    const formatMatrix: string[] = stringMatrix.split(/\s+/);
    const matrix_col: number = formatMatrix.length / matrix_row;
    const tempMatrix: number[][] = [];
    for (let r = 0, i = 0; r < matrix_row; r++) {
      tempMatrix.push([0]);
      for (let c = 0; c < matrix_col; i++, c++) {
        tempMatrix[r][c] = parseFloat(formatMatrix[i]);
      }
    }
    return new Matrix(tempMatrix);
  }

  outMatrix(result: Matrix) {
    let tempResult = '结果为:\n';
    for (let r = 0; r < result.getRow(); r++) {
      for (let c = 0; c < result.getCol(); c++) {
        tempResult = tempResult + result.getMatrix()[r][c].toFixed(3) + '\t';
      }
      tempResult = tempResult + '\n\n';
    }
    this.result = tempResult + this.result;
  };

  outNumber(result: number) {
    const tempResult: string = '结果为:' + result.toFixed(3) + '\n';
    this.result = tempResult + this.result;
  }

  multiply(stringMatrix1: string, stringMatrix2: string) {
    if (stringMatrix1 !== '' && stringMatrix2 !== '') {
      this.outMatrix(MatrixService.multiply(this.matrixInit(stringMatrix1), this.matrixInit(stringMatrix2)));
    } else {
      alert('请输入待计算矩阵');
    }
  }

  add(stringMatrix1: string, stringMatrix2: string) {
    if (stringMatrix1 !== '' && stringMatrix2 !== '') {
      this.outMatrix(MatrixService.add(this.matrixInit(stringMatrix1), this.matrixInit(stringMatrix2)));
    } else {
      alert('请输入待计算矩阵');
    }
  }

// 矩阵转置
  transpose(stringMatrix: string) {
    if (stringMatrix !== '') {
      this.outMatrix(MatrixService.transpose(this.matrixInit(stringMatrix)));
    } else {
      alert('请输入待计算矩阵');
    }
  }

  // 矩阵减法
  subtract(stringMatrix1: string, stringMatrix2: string) {
    if (stringMatrix1 !== '' && stringMatrix2 !== '') {
      this.outMatrix(MatrixService.subtract(this.matrixInit(stringMatrix1), this.matrixInit(stringMatrix2)));
    } else {
      alert('请输入待计算矩阵');
    }
  }

  // 求行列式
  getDetaminate(stringMatrix: string) {
    if (stringMatrix !== '') {
      let result: number;
      result = MatrixService.getDetaminate(this.matrixInit(stringMatrix));
      if (result !== null) {
        this.outNumber(result);
      } else {
        alert('计算错误,该矩阵无行列式');
      }
    } else {
      alert('请输入待计算矩阵');
    }
  }

  // 互换
  exchange() {
    const tempMatrix: string = this.textarea.matrix1;
    this.textarea.matrix1 = this.textarea.matrix2;
    this.textarea.matrix2 = tempMatrix;
  }

// 求伴随矩阵
  getAdjoint(stringMatrix: string) {
    if (stringMatrix !== '') {
      const result: Matrix = MatrixService.getAdjoint(this.matrixInit(stringMatrix));
      if (result !== null) {
        this.outMatrix(result);
      } else {
        alert('计算错误,该矩阵无伴随矩阵');
      }
    } else {
      alert('请输入待计算矩阵');
    }
  }

// 求逆矩阵
  getInverseMatrix(stringMatrix: string) {
    if (stringMatrix !== '') {
      const result: Matrix = MatrixService.getInverseMatrix(this.matrixInit(stringMatrix));
      if (result !== null) {
        this.outMatrix(result);
      } else {
        alert('计算错误,该矩阵无逆矩阵');
      }
    } else {
      alert('请输入待计算矩阵');
    }
  }

// 矩阵正交化
  getOrthogonalization(stringMatrix: string) {
    if (stringMatrix !== '') {
      this.outMatrix(MatrixService.getOrthogonalization(this.matrixInit(stringMatrix)));
    } else {
      alert('请输入待计算矩阵');
    }
  }

  // 矩阵单位化
  getUnit(stringMatrix: string) {
    if (stringMatrix !== '') {
      this.outMatrix(MatrixService.getUnit(this.matrixInit(stringMatrix)));
    } else {
      alert('请输入待计算矩阵');
    }
  }

  // 矩阵正交单位化
  getOrthogonalUnit(stringMatrix: string) {
    if (stringMatrix !== '') {
      this.outMatrix(MatrixService.getOrthogonalUnit(this.matrixInit(stringMatrix)));
    } else {
      alert('请输入待计算矩阵');
    }
  }

}
