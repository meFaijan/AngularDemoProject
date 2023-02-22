var app = angular.module("DemoApp", ['ngFileUpload']);

app.controller("HomeController", function ($scope, $http) {
    $scope.btnSaveTextBatch = "Save";
    $scope.student_relatives_details = [];
    $scope.academic_detail = [];
    $scope.student_documents = [];
    $scope.SelectedFile = [];
    $scope.SignatureFileName = "";
    $scope.PhotoFileName = "";
    $scope.SelectedFiles = [];
    $scope.Genders = [];
    $scope.Religions = [];
    $scope.Categories = [];
    $scope.DocumentTypes = [];
    $scope.ClassDetails = [];
    $scope.StudentList = [];

    $scope.GetStudentList = function () {
        $http.get("/StudentInfo/GetStudentRecord").then(function (d) {
            $scope.StudentList = d.data;
        }, function (error) {
            alert(error)
        });
    };

    $scope.UploadPhotoSelectedFile = function (files) {
        if (files.length > 0) {
            $scope.SelectedFiles.push(files);
            $scope.PhotoFileName = files[0].name;
        }
    };
    $scope.UploadSignatureSelectedFile = function (files) {
        if (files.length > 0) {
            $scope.SelectedFiles.push(files);
            $scope.SignatureFileName = files[0].name;
        }
    };

    $scope.UploadFiles = function (files) {
        if (files.length > 0) {
            $scope.SelectedFile = files;
            $scope.SelectedFiles.push(files);
        }
    };

    $scope.GetRequiredDropdownData = function () {
        $http.get("/StudentInfo/GetRequiredDropdownData").then(function (d) {
            $scope.StudentList = d.data.student_info;
            $scope.ClassDetails = d.data.class_details;
            $scope.Categories = d.data.categories;
            $scope.Genders = d.data.genders;
            $scope.Religions = d.data.religions;
            $scope.DocumentTypes = d.data.document_type;
        }, function (error) {
            alert(error)
        });
    };

    $scope.GetRequiredDropdownData();

    $scope.GetGenderValue = function () {
        //alert("Selected Value: " + $scope.Genders[$scope.gender_id - 1].id + "\nSelected Text: " + $scope.Genders[$scope.gender_id - 1].title);
    };


    $scope.GetOneRecord = function (id) {
        $http.get("/StudentInfo/GetDataById/" + id).then(function (d) {
            $scope.student_info = d.data;
            $scope.id = d.data.id;
            $scope.Admin_date = d.data.AdmitDate;
            $scope.birth_date = d.data.BirthDate;
            $scope.blood_group = d.data.blood_group;
            $scope.contact_no = d.data.contact_no;
            $scope.email = d.data.email;
            $scope.first_name = d.data.first_name;
            $scope.grade_no = d.data.grade_no;
            $scope.height = d.data.height;
            $scope.last_name = d.data.last_name;
            $scope.middle_name = d.data.middle_name;
            $scope.mother_tongue = d.data.mother_tongue;
            $scope.nationality = d.data.nationality;
            $scope.physical_disability = d.data.physical_disability;
            $scope.gender_id = d.data.gender_id;
            $scope.religion_id = d.data.religion_id;
            $scope.category_id = d.data.category_id;
            $scope.student_relatives_details = d.data.student_relatives_details;
            $scope.academic_detail = d.data.academic_detail;
            $scope.student_documents = d.data.student_documents;
            $scope.GetRequiredDropdownData();
        }, function (error) {
            alert(error)
        });
    };


    $scope.RemoveStudentDocument = function (index) {
        //Find the record using Index from Array.
        var name = $scope.student_documents[index].student_name;
        if (confirm("Do you want to delete: " + name)) {
            $scope.student_documents.splice(index, 1);
        }
    }

    $scope.AddStudentDocument = function () {
        var student_documents = {};
        student_documents.document_type_id = $scope.document_type_id;
        student_documents.document_type_name = $scope.DocumentTypes.filter(function (obj) { return obj.id === $scope.document_type_id; })[0].title;
        student_documents.SelectedFileName = $scope.SelectedFile[0].name;
        student_documents.description = $scope.description;
        $scope.student_documents.push(student_documents);
        $scope.document_type_name = "";
        $scope.FileName = "";
        $scope.description = "";
    };

    $scope.RemoveRelativeDetails = function (index) {
        //Find the record using Index from Array.
        var name = $scope.student_relatives_details[index].student_name;
        if (confirm("Do you want to delete: " + name)) {
            $scope.student_relatives_details.splice(index, 1);
        }
    }

    $scope.AddRelativeDetails = function () {
        var student_relatives_details = {};
        student_relatives_details.class_name = $scope.class_id;
        student_relatives_details.class_id = $scope.class_id;
        student_relatives_details.ClassName = $scope.ClassDetails.filter(function (obj) { return obj.id === $scope.class_id; })[0].title;
        student_relatives_details.student_id = $scope.student_id;
        student_relatives_details.StudentName = $scope.StudentList.filter(function (obj) { return obj.id === $scope.student_id; })[0].FullName;
        student_relatives_details.relation = $scope.relation;
        student_relatives_details.remarks = $scope.remarks;
        $scope.student_relatives_details.push(student_relatives_details);
        $scope.class_id = "";
        $scope.student_id = "";
        $scope.relation = "";
        $scope.remarks = "";
    };

    $scope.RemoveAcademicDetail = function (index) {
        //Find the record using Index from Array.
        var name = $scope.academic_detail[index].class;
        if (confirm("Do you want to delete: " + name)) {
            $scope.academic_detail.splice(index, 1);
        }
    }

    $scope.AddAcademicDetail = function () {
        var academic_detail = {};
        academic_detail.class = $scope.class;
        academic_detail.exam = $scope.exam;
        academic_detail.passout_year = $scope.passout_year;
        academic_detail.symbol_no = $scope.symbol_no;
        academic_detail.obtained_marks = $scope.obtained_marks;
        academic_detail.obtained_percent = $scope.obtained_percent;
        academic_detail.division = $scope.division;
        academic_detail.gpa = $scope.gpa;
        academic_detail.school_college_name = $scope.school_college_name;
        $scope.academic_detail.push(academic_detail);
        $scope.class = "";
        $scope.exam = "";
        $scope.passout_year = "";
        $scope.symbol_no = "";
        $scope.obtained_marks = "";
        $scope.obtained_percent = "";
        $scope.division = "";
        $scope.gpa = "";
        $scope.school_college_name = "";
    };


    $scope.SaveData = function () {
        var student_info = {};
        student_info.id = $scope.id;
        student_info.Admin_date = $scope.Admin_date;
        student_info.birth_date = $scope.birth_date;
        student_info.blood_group = $scope.blood_group;
        student_info.category_id = $scope.category_id;
        student_info.contact_no = $scope.contact_no;
        student_info.email = $scope.email;
        student_info.first_name = $scope.first_name;
        student_info.gender_id = $scope.gender_id;
        student_info.grade_no = $scope.grade_no;
        student_info.height = $scope.height;
        student_info.last_name = $scope.last_name;
        student_info.middle_name = $scope.middle_name;
        student_info.mother_tongue = $scope.mother_tongue;
        student_info.nationality = $scope.nationality;
        student_info.physical_disability = $scope.physical_disability;
        student_info.religion_id = $scope.religion_id;
        student_info.PhotoFileName = $scope.PhotoFileName;
        student_info.SignatureFileName = $scope.SignatureFileName;
        var academic_detail = new Array();
        for (var i = 0; i < $scope.academic_detail.length; i++) {
            var detail = {};
            detail = $scope.academic_detail[i];
            academic_detail.push(detail);
        }
        student_info.academic_detail = academic_detail;
        var student_relatives_details = new Array();
        for (var i = 0; i < $scope.student_relatives_details.length; i++) {
            var detail = {};
            detail = $scope.student_relatives_details[i];
            student_relatives_details.push(detail);
        }
        student_info.student_relatives_details = student_relatives_details;
        var student_documents = new Array();
        for (var i = 0; i < $scope.student_documents.length; i++) {
            var detail = {};
            detail = $scope.student_documents[i];
            student_documents.push(detail);
        }
        student_info.student_documents = student_documents;
        var formData = new FormData();
        var files = $scope.SelectedFiles;
        if (files != undefined) {
            for (var i = 0; i < files.length; i++) {
                formData.append(files[i][0].name, files[i][0]);
            }
        }
        formData.append("student_info", JSON.stringify(student_info));
        $.ajax({
            url: '/StudentInfo/SaveInfo',
            type: "POST",
            contentType: false,
            processData: false,
            data: formData,
            success: function (result) {
                alert(result.Mes);
                if (result.Status == true) {
                    $scope.academic_detail = [];
                    $scope.student_relatives_details = [];
                    $scope.student_documents = [];
                    location.href = '/StudentInfo/Index';
                }
            },
            error: function (err) {
                $scope.Message = err.Message;
            }
        });
    };

    $scope.DeleteStudent = function (index) {
        var student = $scope.StudentList[index];
        if (confirm("Do you want to delete: " + student.FullName)) {
            $.ajax({
                url: '/StudentInfo/Delete/'+student.id,
                type: "POST",
                contentType: false,
                processData: false,
                success: function (result) {
                    alert(result.Mes);
                    if (result.Status == true) {
                        $scope.StudentList.splice(index, 1);
                    }
                },
                error: function (err) {
                    $scope.Message = err.Message;
                }
            });
        }
    }

    $scope.EditStudent = function (index) {
        var student = $scope.StudentList[index];
        location.href = '/StudentInfo/Edit/' + student.id;
    }


});