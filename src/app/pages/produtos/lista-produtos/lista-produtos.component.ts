import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  closeResult = '';
  produtos!: Produto[];
  produtoForm!: FormGroup;
  showToastErro = false;
  showToastSucesso = false;
  mensagemRetorno = '';
  tituloAcao = 'Novo';
  imageProduto = '../../../../assets/semImagemCadastrada.png';
  isEdicao = false;
  objProduto!: Produto;

  constructor(private modalService: NgbModal,private produtoService: ProdutoService,
    private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.carregarProdutos();
    this.criarForm();
  }

  criarForm(): void{
    this.produtoForm = this.formBuilder.group({
      name: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.required
        ])
      ],
      price: ['', Validators.compose([
        Validators.required
      ])],
      imagePath: [],
      id: []
    });
  }

  carregarProdutos(): void{
    this.produtoService.listar().subscribe(produtos => { this.produtos = produtos });
  }

  removerProdutoLista(produto: Produto) {
    const index = this.produtos.indexOf(produto);
    if (index != -1) {
      this.produtos.splice(index, 1);
    }
  }

  atualizarProdutoLista(index: number, produto: Produto) {
    if (index != -1) {
      this.produtos[index] = produto;
    }
  }

  adicionarProdutoLista(produto: Produto) {
    this.produtos.push(produto);
  }

  excluir(produto: Produto) {
    this.produtoService.excluir(produto.id).subscribe((data: any) => {
      if (data.success) {
        this.showToastErro = false;
        this.showToastSucesso = true;
        this.mensagemRetorno = data.message;
        this.produtoForm.reset();
        this.removerProdutoLista(produto);
        this.modalService.dismissAll();
      } else {
        this.showToastSucesso = false;
        this.showToastErro = true;
      }
    }, (err) => {
      this.showToastSucesso = false;
      this.showToastErro = true;
      this.mensagemRetorno = err;
    });
  }

  salvar() {
    this.isEdicao ? this.atualizar() : this.criar();
  }

  cancelar() {
    this.produtoForm.reset();
    this.modalService.dismissAll();
  }

  atualizar() {
    const index = this.produtos.findIndex(x => x.id === this.produtoForm.get('id')?.value);
    this.produtoService.atualizar(this.produtoForm.value).subscribe((data: any) => {
      if (data.success) {
        this.showToastErro = false;
        this.showToastSucesso = true;
        this.mensagemRetorno = data.message;
        this.atualizarProdutoLista(index, data.data);
        this.produtoForm.reset();
        this.modalService.dismissAll();
      } else {
        this.showToastSucesso = false;
        this.showToastErro = true;
      }
    }, (err) => {
      this.showToastSucesso = false;
      this.showToastErro = true;
      this.mensagemRetorno = err;
    });
  }

  criar() {
    this.produtoService.criar(this.produtoForm.value).subscribe((data: any) => {
      if (data.success) {
        this.showToastErro = false;
        this.showToastSucesso = true;
        this.mensagemRetorno = data.message;
        this.adicionarProdutoLista(data.data);
        this.produtoForm.reset();
        this.modalService.dismissAll();
      } else {
        this.showToastSucesso = false;
        this.showToastErro = true;
      }
    }, (err) => {
      this.showToastSucesso = false;
      this.showToastErro = true;
      this.mensagemRetorno = err;
    });
  }

  editarProduto(modalProduto: any, produto: Produto) {
    this.abrirModalProduto(modalProduto);
    this.isEdicao = true;
    this.tituloAcao = 'Editar';
    this.produtoForm.patchValue(produto);
    this.imageProduto = this.produtoForm.get('imagePath')?.value;
  }

  abrirModalProduto(modalProduto: any) {
    this.produtoForm.reset();
    this.showToastSucesso = false;
    this.showToastErro = false;
    this.imageProduto = '../../../../assets/semImagemCadastrada.png';
    this.modalService.open(modalProduto, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  abrirModalConfirmarExclusaoProduto(modalConfirmarExclusaoProduto: any) {
    this.modalService.open(modalConfirmarExclusaoProduto, { size: 'sm' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}