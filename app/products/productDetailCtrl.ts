module app.ProductDetail {
    interface IProductDetail {
        title: string;
        product: app.domain.IProduct;
    }

    interface IProductParams extends ng.route.IRouteParamsService {
        productId: number;

    }

    class ProductDetailCtrl implements IProductDetail {
        title: string;
        product: app.domain.IProduct;

        static $inject = ["$routeParams", "dataAccessService"];
        constructor(private $routeParams: IProductParams,
                    private dataAccessService: app.common.DataAccessService) {
            this.title = "Product Detail";

            var productResource = dataAccessService.getProductRescource();
            productResource.get({productId: $routeParams.productId},
                (data: app.domain.IProduct) => {
                this.product = data;
            });
        }
    }

    angular.module("productManagement").controller("ProductDetailCtrl", ProductDetailCtrl)
}