(function () {
    app.controller('LoginController', function ($scope, $http) {
        $scope.Login = function () {
            var login_details = {};
            login_details.username = $scope.username;
            login_details.password = $scope.password;
            var formData = new FormData();
            formData.append("login_details", JSON.stringify(login_details));
            $.ajax({
                url: '/Home/Login',
                type: "POST",
                contentType: false,
                processData: false,
                data: formData,
                success: function (result) {
                    alert(result.Mes);
                    if (result.Status == true) {
                        location.href = '/StudentInfo/Index';
                    }
                },
                error: function (err) {
                    $scope.Message = err.Message;
                }
            });
        };
    });
}).call(angular);