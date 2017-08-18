import {Component, OnInit} from '@angular/core';
import {LinearAlgebra}from '../../provider/LinearAlgebra'
import {Matrix} from '../../provider/Matrix'
import {templateJitUrl} from "@angular/compiler";
@Component({
  selector: 'app-service-matrix',
  templateUrl: './service-matrix.component.html',
  styleUrls: ['./service-matrix.component.css']
})
export class ServiceMatrixComponent implements OnInit {
  matrix1: Matrix ;
  matrix2: Matrix ;
  result : string = '';
  textarea: {matrix1: string, matrix2: string} = {matrix1 : '',matrix2 :''};
  constructor(private linearAlgebra:LinearAlgebra) {

  }

  ngOnInit() {
  }

  calculateInit() {
    let stringMatrix1:string[];
    let stringMatrix2:string[];

    stringMatrix1 = this.textarea.matrix1.split('\n');
    stringMatrix2 = this.textarea.matrix2.split('\n');

    let matrix1_row : number = stringMatrix1.length;
    let matrix2_row : number = stringMatrix2.length;
    stringMatrix1 = this.textarea.matrix1.split(/\s+/);
    stringMatrix2 = this.textarea.matrix2.split(/\s+/);
    let matrix1_col : number= stringMatrix1.length / matrix1_row;
    let matrix2_col : number= stringMatrix2.length / matrix2_row;

    let tempMatrix1 : number[][]=[];
    let tempMatrix2 : number[][]=[];
    for(let r = 0,i=0;r<matrix1_row;r++){
      tempMatrix1.push([0]);
      for(let c = 0;c<matrix1_col;i++,c++){
      tempMatrix1[r][c]=parseFloat(stringMatrix1[i]) ;
      }
    }
    for(let r = 0,i=0;r<matrix2_row;r++){
      tempMatrix2.push([0]);
      for(let c = 0;c<matrix2_col;i++,c++){
        tempMatrix2[r][c]=parseFloat(stringMatrix2[i]) ;
      }

    }

    this.matrix1 = new Matrix(tempMatrix1);
    this.matrix2 = new Matrix(tempMatrix2);

  }

  outMatrix(result:Matrix){
   let tempResult :string = "结果为:\n";
   for(let r=0;r<result.getRow();r++){
     for(let c=0;c<result.getCol();c++){
        tempResult = tempResult + result.getMatrix()[r][c].toFixed(3)+ "\t";
     }
     tempResult =tempResult + "\n\n";
   }
   this.result = tempResult + this.result;
  };
  outNumber(result : number){
    let tempResult :string = "结果为:" + result.toFixed(3)+"\n";

    this.result = tempResult + this.result;
  }
  multiply(){
      this.calculateInit();
      this.outMatrix(this.linearAlgebra.multiply(this.matrix1,this.matrix2));
  }
  add(){
    this.calculateInit();
    this.outMatrix(this.linearAlgebra.add(this.matrix1,this.matrix2));
  }
//矩阵转置
  transpose(choose:string){
    this.calculateInit();
    if(choose == "matrix1"){
      this.outMatrix(this.linearAlgebra.transpose(this.matrix1));
    }
    else if(choose == "matrix2"){
      this.outMatrix(this.linearAlgebra.transpose(this.matrix2));
    }
  }
  //矩阵减法
  subtract(){
    this.calculateInit();
    this.outMatrix(this.linearAlgebra.subtract(this.matrix1,this.matrix2));
  }
  //求行列式
  getDetaminate(choose:string){
    this.calculateInit();
    let result:number;
    if(choose == "matrix1"){
      result = this.linearAlgebra.getDetaminate(this.matrix1);
    }
    else if(choose == "matrix2"){
      result = this.linearAlgebra.getDetaminate(this.matrix2);
    }
    if(result!=null){
      this.outNumber(result);
    }
    else{
      alert("计算错误,该矩阵无行列式")
    }
  }
  //互换
  exchange(){
    let tempMatrix: string = this.textarea.matrix1;
    this.textarea.matrix1 = this.textarea.matrix2;
    this.textarea.matrix2 = tempMatrix;
  }
//求伴随矩阵
  getAdjoint(choose:string){
    this.calculateInit();
    let result : Matrix;
    if(choose == "matrix1"){
      result = this.linearAlgebra.getAdjoint(this.matrix1);
    }
    else if(choose == "matrix2"){
    result = this.linearAlgebra.getAdjoint(this.matrix2);
    }

    if (result!=null){
      this.outMatrix(result);
    }
    else{
      alert("计算错误,该矩阵无伴随矩阵");
    }

  }
//求逆矩阵
  getInverseMatrix(choose:string){
    this.calculateInit();
    let result : Matrix;
    if(choose == "matrix1"){
      result = this.linearAlgebra.getInverseMatrix(this.matrix1);
    }
    else if(choose == "matrix2"){
      result = this.linearAlgebra.getInverseMatrix(this.matrix2);
    }
    if (result!=null){
      this.outMatrix(result);
    }
    else{
      alert("计算错误,该矩阵无逆矩阵");
    }

  }
//矩阵正交化
  getOrthogonalization(choose:string){
    this.calculateInit();
    let result : Matrix;
    if(choose == "matrix1"){
      result = this.linearAlgebra.getOrthogonalization(this.matrix1);
    }
    else if(choose == "matrix2"){
      result = this.linearAlgebra.getOrthogonalization(this.matrix2);
    }

      this.outMatrix(result);

  }

  //矩阵单位化
  getUnit(choose:string){
    this.calculateInit();
    let result : Matrix;
    if(choose == "matrix1"){
      result = this.linearAlgebra.getUnit(this.matrix1);
    }
    else if(choose == "matrix2"){
      result = this.linearAlgebra.getUnit(this.matrix2);
    }

    this.outMatrix(result);
  }
  //矩阵正交单位化
  getOrthogonalUnit(choose:string){
    this.calculateInit();
    let result : Matrix;
    if(choose == "matrix1"){
      result = this.linearAlgebra.getOrthogonalUnit(this.matrix1);
    }
    else if(choose == "matrix2"){
      result = this.linearAlgebra.getOrthogonalUnit(this.matrix2);
    }

    this.outMatrix(result);

  }

}
