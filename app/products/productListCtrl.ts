module app.ProductList {
	interface IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];
		toggleImage(): void; 
	}
	
	class ProductListCtrl implements IProductListModel {
		title: string;
		showImage: boolean;
		products: app.domain.IProduct[];	
		
		static $inject = ["dataAccessService"];
		constructor( private dataAccessService: app.common.DataAccessService) {
			this.title = "Product List";
			this.showImage = false;
			this.products = [];

			var productResource = dataAccessService.getProductRescource();
			productResource.query( 
				(data: app.domain.IProduct[]) => {
					this.products = data;
				}
			)
		}
	
		toggleImage(): void {
			this.showImage = !this.showImage;
		}
	
		public test(){
			console.log("test");
		}
	}
	
	angular
		.module("productManagement")
		.controller("ProductListCtrl", ProductListCtrl);
}
