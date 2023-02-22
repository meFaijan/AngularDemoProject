(app.controller("deliveryRatebyDistanceCtrl", ["$rootScope", "$scope", '$http', 'httpService', '$filter', 'queryStringService', '$mdDialog', "currentStoreService"
    , function ($rootScope, $scope, $http, httpService, $filter, queryStringService, $mdDialog, currentStoreService
    ) {
        $scope.title = "This is Delivery Rate";
        $scope.deliveryRate = {};
        $scope.deliveryRates = [];
        $scope.update = true;
        $scope.storeSelection = true;
        $scope.storeInfoPrefix = {
            stores: null

        };
        $scope.GetAllDeliveryRatebyDistance = function () {
            try {

                httpService.get("api/DeliveryRatebyDistance/GetAllDeliveryRate", null).then(
                    function success(response) {
                        if (response.data.success) {
                            $scope.deliveryRates = response.data.output;
                        }
                        else {
                            alert(response.data.message);
                        }

                    }, function error() {
                        alert("failure response GetAllDeliveryRatebyDistance");
                    }
                );
            } catch (e) {
                alert('GetAllDeliveryRatebyDistance ' + e.message);
            }
        };

        $scope.OnInit = function () {

            $scope.GetAllDeliveryRatebyDistance();
            $scope.GetReferenceData();
        }

        $scope.GetReferenceData = function () {
            try {
                var storeId = $scope.currentStoreInfo.storeID;

                httpService.get("api/Prefix/GetStoreInfoPrefix", null).then(
                    function success(response) {
                        if (response.data.success) {
                            $scope.storeInfoPrefix = response.data.output;
                        }
                        else {
                            alert(response.data.message);
                        }

                    }, function error() {
                        alert("failure response GetDeliveryRate");
                    }
                );
            } catch (e) {
                alert('GetDeliveryRate ' + e.message);
            }
        };

        $scope.SaveDeliveryRatebyDistance = function () {
            try {
                if ($scope.currentStoreInfo.storeID != null) {
                    $scope.deliveryRate.storeID = $scope.currentStoreInfo.storeID;

                }
                else {
                    $scope.deliveryRate.storeID = $scope.storeInfo.storeID;
                }

                var Param = JSON.stringify($scope.deliveryRate);
                httpService.post("api/DeliveryRatebyDistance/SaveDeliveryRatebyDistance", Param).then(
                    function success(response) {
                        if (response.data.success) {
                            alert(response.data.message);
                            $scope.GetAllDeliveryRatebyDistance();
                            $scope.CancelDeliveryRatebyDistance();
                        }
                        else {
                            alert(response.data.message);
                        }

                    }, function error() {
                        alert("failure response SaveDeliveryRatebyDistance");
                    }
                );
            } catch (e) {
                alert('SaveDeliveryRatebyDistance ' + e.message);
            }
        };

        $scope.EditDeliveryRatebyDistance = function (item) {
            $scope.deliveryRate = item;
            $scope.storeInfo = $filter('filter')($scope.storeInfoPrefix.stores, { storeID: item.storeID }, true)[0];

            $scope.showPrerenderedDialog();
            $scope.update = false;

        }

        $scope.UpdateDeliveryRatebyDistance = function () {
            try {
                //if ($scope.currentStoreInfo.storeID != null) {
                //    $scope.deliveryRate.storeID = $scope.currentStoreInfo.storeID;

                //}
                //else {
                //    $scope.deliveryRate.storeID = $scope.storeInfo.storeID;
                //}
                $scope.deliveryRate.storeID = $scope.storeInfo.storeID;
                var Param = JSON.stringify($scope.deliveryRate);
                httpService.post("api/DeliveryRatebyDistance/UpdateDeliveryRatebyDistance", Param).then(
                    function success(response) {
                        if (response.data.success) {
                            alert(response.data.message);
                            $scope.CancelDeliveryRatebyDistance();
                            $scope.CloseModel();
                            $scope.GetAllDeliveryRatebyDistance();
                        }
                        else {
                            alert(response.data.message);
                        }


                    }, function error() {
                        alert("failure response UpdateDeliveryRate");
                    }
                );
            } catch (e) {
                alert('UpdateDeliveryRate ' + e.message);
            }
        };

        $scope.DeleteDeliveryRate = function (item) {
               try {
                $scope.rateID = item;
                var Param = JSON.stringify($scope.rateID.id);
                httpService.post("api/DeliveryRatebyDistance/DeleteDeliveryRatebyDistance", Param).then(
                    function success(response) {
                        if (response.data.success) {
                            alert(response.data.message);
                            $scope.GetAllDeliveryRatebyDistance();
                        }
                        else {
                            alert(response.data.message);
                        }

                    }, function error() {
                        alert("failure response DeleteDeliveryRate");
                    }
                );
            } catch (e) {
                alert('DeleteDeliveryRate ' + e.message);
            }
        };

        ////--Model Popup-------
        $scope.showPrerenderedDialog = function (ev) {
            $mdDialog.show({
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            });

        };


        $scope.CloseModel = function () {
            $scope.deliveryRate = null;
            $scope.update = true;
            $scope.storeInfo = null;
            $mdDialog.hide();
        };

        $scope.CancelDeliveryRatebyDistance = function () {
            try {
                $scope.deliveryRate = null;
                $scope.storeInfo = null;

            } catch (e) {
                alert(e.message);
            }
        };

        var getCurrentStore = $scope.$watch(function () {
            //currentStoreService.searchCurrentStore();
            // $rootScope.currentStore = currentStoreService.getCurrentStore();
            if ($rootScope.currentStore != null) {
                console.log($rootScope.currentStore);
                $scope.currentStoreInfo = $rootScope.currentStore;
                getCurrentStore();
            }
        }, true);

    }]));