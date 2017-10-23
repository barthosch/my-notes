(function () {
	var app = angular.module("notes", []);
	
    // view for editing a note
    app.directive("editNote", function () {
        return {
            restrict: "AE",
            templateUrl: "views/edit-note.html"
        };
    });
    
    // view for editing a list
    app.directive("editList", function () {
        return {
            restrict: "AE",
            templateUrl: "views/edit-list.html"
        };
    });
        
    // view for displaying a list containing notes
    app.directive("displayList", function () {
        return {
            restrict: "AE",
            templateUrl: "views/display-list.html"
        };
    });
    
    
    // main controller
    // todo: should probably split up into different controllers
	app.controller("NotesController", ["$scope",
        function ($scope) {	

            // default empty list when user adds a list
            $scope.listDefault = {
                type: "notes",
                name: "New List",
                hideDone: false,
                notes: []
            };

            // different default values for new notes depending on list type
            $scope.noteDefaults = {
                "notes": { },
                "deadlines": {
                    due: (new Date()).toISOString().substr(0, 10)
                },
                "tasks": {
                    priority: 1,
                    details: ""
                },
                "shopping": {
                    quantity: 1
                }
            };


            // Retrieve notes lists from local storage
            var localLists = localStorage.getItem('SBmyNotes');
            $scope.lists = JSON.parse(localLists);
            if (!$scope.lists) {
                // no lists found. populate lists with demo data
                $scope.lists = [
                    {
                        type: "notes",
                        name: "Pin Board",
                        hideDone: false,
                        notes: [
                            {
                                done: false,
                                caption: "Carpe Diem",
                                color: "green"
                            },
                            {
                                done: false,
                                caption: "Ideas for MyNotes app!"
                            },
                            {
                                done: false,
                                caption: "Call Mom"
                            }
                        ]
                    },
                    {
                        type: "deadlines",
                        name: "My Application",
                        hideDone: false,
                        notes: [
                            {
                                done: true,
                                caption: "Write resume",
                                due: "2016-02-09",
                                color: "red"
                            },
                            {
                                done: true,
                                caption: "Finish MyNotes app",
                                due: "2016-02-12",
                                color: "blue"
                            },
                            {
                                done: false,
                                caption: "implement more ideas into the app",
                                due: "2016-02-15"
                            },
                            {
                                done: false,
                                caption: "Write resignation?"
                            }
                        ]
                    },
                    {
                        type: "shopping",
                        name: "Shopping",
                        hideDone: false,
                        notes: [
                            {
                                done: false,
                                caption: "Eggs",
                                quantity: 12
                            },
                            {
                                done: true,
                                caption: "Milk",
                                quantity: 1
                            },
                            {
                                done: false,
                                caption: "Bread",
                                quantity: 1
                            },
                            {
                                done: false,
                                caption: "Coffee",
                                quantity: 2
                            },
                            {
                                done: false,
                                caption: "Flowers",
                                quantity: 10
                            }
                        ]
                    }
                ];
                
                alert ("Welcome to 'My Notes'! To help you get started, we added some demo lists for you.");
            }

            $scope.currentList = $scope.lists[0];

            $scope.selectList = function (list) {
                $scope.currentList = list;
            };

            $scope.allDone = function () {
                for (var x=0; x<$scope.currentList.notes.length; x++) {
                    $scope.currentList.notes[x].done=true;
                }    
                $scope.saveData();
            };

            $scope.allPending = function () {
                for(var x=0; x<$scope.currentList.notes.length; x++) {
                    $scope.currentList.notes[x].done=false;
                }    
                $scope.saveData();
            };

            $scope.addNote = function () {
                var newNote = angular.copy($scope.noteDefaults[$scope.currentList.type]);
                $scope.adding = true;
                $scope.editing = false;
                $scope.currentNote = newNote;
                // todo: focus first input element after opening the dialog
            };

            $scope.editNote = function (note) {
                $scope.editing = true;
                $scope.adding = false;
                $scope.currentNote = note;
                $scope.copy = angular.copy(note);
                // todo: focus first input element after opening the dialog
            };

            $scope.deleteNote = function () {
                var index = $scope.currentList.notes.indexOf($scope.currentNote);
                $scope.currentList.notes.splice(index,1);
                $scope.editing = false;
                $scope.saveData();
            };

            $scope.applyEditNote = function () {
                if($scope.adding === true) {
                    $scope.currentList.notes.push($scope.currentNote);
                }
                $scope.adding = false;
                $scope.editing = false;
                $scope.saveData();
            };

            $scope.cancelEditNote = function () {
                if($scope.editing === true) {
                    angular.copy($scope.copy, $scope.currentNote);
                    $scope.copy = 0;
                }
                $scope.adding = false;
                $scope.editing = false;
            };

            $scope.setNoteColor = function(note, color) {
                note.color = note.color===color ? '': color;
                $scope.saveData();
            };

            $scope.addList = function() {
                var newList = angular.copy($scope.listDefault);
                $scope.addingList = true;
                $scope.editingList = false;
                $scope.currentList = newList;
                // todo: focus first input element after opening the dialog
            };

            $scope.editList = function() {
                $scope.editingList = true;
                $scope.addingList = false;
                $scope.copy = angular.copy($scope.currentList);
                // todo: focus first input element after opening the dialog
            };

            $scope.deleteList = function() {
                if($scope.lists.length === 1) {
                    alert ("You cannot delete your last remaining list.");
                    return;
                } 
                var index = $scope.lists.indexOf($scope.currentList);
                $scope.lists.splice(index,1);
                $scope.editingList = false;
                $scope.currentList = $scope.lists[Math.min($scope.lists.length-1, index)];
                $scope.saveData();
            };

            $scope.applyEditList = function() {
                if($scope.addingList === true) {
                    $scope.lists.push($scope.currentList);
                }
                $scope.addingList = false;
                $scope.editingList = false;
                $scope.saveData();
            };

            $scope.cancelEditList = function() {
                if($scope.editingList === true) {
                    angular.copy($scope.copy, $scope.currentList);
                    $scope.copy = 0;
                }
                $scope.addingList = false;
                $scope.editingList = false;
            };

            $scope.saveData = function() {
                // todo: save data to a backend
                // todo: only push changes instead of the whole blob?
                console.log(JSON.stringify($scope.lists));
                localStorage.setItem('SBmyNotes', JSON.stringify($scope.lists));
            };
        }
    ]);
})();