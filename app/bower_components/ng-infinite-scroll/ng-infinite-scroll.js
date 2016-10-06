angular
    .module('infinite-scroll', [])
    .value('THROTTLE_MILLISECONDS', null)
    .directive('infiniteScroll', ['$rootScope', '$window', '$timeout', 'THROTTLE_MILLISECONDS', function ($rootScope, $window, $timeout, THROTTLE_MILLISECONDS) {
        return {
            scope: {
                infiniteScroll: '&',
                infiniteScrollContainer: '=',
                infiniteScrollDistance: '=',
                infiniteScrollDisabled: '=',
                infiniteScrollHorizontal: '='
            },
            link: function (scope, elem, attrs) {
                var changeContainer,
                    checkWhenEnabled,
                    container,
                    handleInfiniteScrollContainer,
                    handleInfiniteScrollDisabled,
                    handleInfiniteScrollDistance,
                    handleInfiniteScrollHorizontal,
                    handler,
                    immediateCheck,
                    scrollDistance,
                    scrollEnabled,
                    throttle,
                    scrollHorizontal;

                $window = angular.element($window);
                scrollDistance = null;
                scrollEnabled = null;
                checkWhenEnabled = null;
                container = null;
                immediateCheck = true;

                handler = function () {
                    var containerBottom, elementBottom, remaining, shouldScroll;
                    if (container === $window) {
                        if (scrollHorizontal) {
                            containerBottom = container.width() + container.scrollLeft();
                            elementBottom = elem.offset().left + elem.width();
                        } else {
                            containerBottom = container.height() + container.scrollTop();
                            elementBottom = elem.offset().top + elem.height();
                        }
                    } else {
                        if (scrollHorizontal) {
                            containerBottom = container.width();
                            elementBottom = elem.offset().left - container.offset().left + elem.width();
                        } else {
                            containerBottom = container.height();
                            elementBottom = elem.offset().top - container.offset().top + elem.height();
                        }
                    }
                    remaining = elementBottom - containerBottom;
                    if (scrollHorizontal) {
                        shouldScroll = remaining <= container.width() * scrollDistance + 1;
                    } else {
                        shouldScroll = remaining <= container.height() * scrollDistance + 1;
                    }
                    if (shouldScroll && scrollEnabled) {
                        return scope.infiniteScroll();
                    } else if (shouldScroll) {
                        return checkWhenEnabled = true;
                    }
                };

                throttle = function (func, wait) {
                    var later, previous, timeout;
                    timeout = null;
                    previous = 0;
                    later = function () {
                        var context;
                        previous = new Date().getTime();
                        $timeout.cancel(timeout);
                        timeout = null;
                        func.call();
                        return context = null;
                    };
                    return function () {
                        var now, remaining;
                        now = new Date().getTime();
                        remaining = wait - (now - previous);
                        if (remaining <= 0) {
                            clearTimeout(timeout);
                            $timeout.cancel(timeout);
                            timeout = null;
                            previous = now;
                            return func.call();
                        } else {
                            if (!timeout) {
                                return timeout = $timeout(later, remaining);
                            }
                        }
                    };
                };

                if (THROTTLE_MILLISECONDS != null) {
                    handler = throttle(handler, THROTTLE_MILLISECONDS);
                }

                scope.$on('$destroy', function () {
                    return container.off('scroll', handler);
                });

                handleInfiniteScrollHorizontal = function (v) {
                    scrollHorizontal = v;
                };
                scope.$watch('infiniteScrollHorizontal', handleInfiniteScrollHorizontal);
                handleInfiniteScrollHorizontal(scope.infiniteScrollHorizontal);

                handleInfiniteScrollDistance = function (v) {
                    return scrollDistance = parseInt(v, 10) || 0;
                };
                scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
                handleInfiniteScrollDistance(scope.infiniteScrollDistance);

                handleInfiniteScrollDisabled = function (v) {
                    scrollEnabled = !v;
                    if (scrollEnabled && checkWhenEnabled) {
                        checkWhenEnabled = false;
                        return handler();
                    }
                };
                scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
                handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);

                changeContainer = function (newContainer) {
                    if (container != null) {
                        container.off('scroll', handler);
                    }
                    container = newContainer;
                    if (newContainer != null) {
                        return container.on('scroll', handler);
                    }
                };
                changeContainer($window);
                handleInfiniteScrollContainer = function (newContainer) {
                    if ((!(newContainer != null)) || newContainer.length === 0) {
                        return;
                    }
                    newContainer = angular.element(newContainer);
                    if (newContainer != null) {
                        return changeContainer(newContainer);
                    } else {
                        throw new Exception("invalid infinite-scroll-container attribute.");
                    }
                };
                scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
                handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);

                if (attrs.infiniteScrollParent != null) {
                    changeContainer(angular.element(elem.parent()));
                }

                if (attrs.infiniteScrollImmediateCheck != null) {
                    immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
                }

                return $timeout((function () {
                    if (immediateCheck) {
                        return handler();
                    }
                }), 0);
            }
        };
    }
    ]);







    // /* ng-infinite-scroll - v1.1.2 - 2014-05-21 */
    // var mod;
    //
    // mod = angular.module('infinite-scroll', []);
    //
    // mod.value('THROTTLE_MILLISECONDS', null);
    //
    // mod.directive('infiniteScroll', [
    //   '$rootScope', '$window', '$timeout', 'THROTTLE_MILLISECONDS', function($rootScope, $window, $timeout, THROTTLE_MILLISECONDS) {
    //     return {
    //       scope: {
    //         infiniteScroll: '&',
    //         infiniteScrollContainer: '=',
    //         infiniteScrollDistance: '=',
    //         infiniteScrollDisabled: '=',
    //         infiniteScrollUseDocumentBottom: '=',
    //         infiniteScrollHorizontal: '='
    //       },
    //       link: function(scope, elem, attrs) {
    //         var changeContainer, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handleInfiniteScrollHorizontal, handler, immediateCheck, scrollDistance, scrollEnabled, throttle, useDocumentBottom, scrollHorizontal;
    //         $window = angular.element($window);
    //         scrollDistance = null;
    //         scrollEnabled = null;
    //         checkWhenEnabled = null;
    //         container = null;
    //         immediateCheck = true;
    //         useDocumentBottom = false;
    //         handler = function() {
    //           var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
    //           if (container === $window) {
    //             if (scrollHorizontal) {
    //               containerBottom = container.width() + container.scrollLeft();
    //               elementBottom = elem.offset().left + elem.width();
    //             } else {
    //               containerBottom = container.height() + container.scrollTop();
    //               elementBottom = elem.offset().top + elem.height();
    //             }
    //           } else {
    //             if (scrollHorizontal) {
    //               containerBottom = container.width();
    //             } else {
    //               containerBottom = container.height();
    //             }
    //             containerTopOffset = 0;
    //             if (container.offset() !== void 0) {
    //               if (scrollHorizontal) {
    //                 containerTopOffset = container.offset().left;
    //               } else {
    //                 containerTopOffset = container.offset().top;
    //               }
    //             }
    //             if (scrollHorizontal) {
    //               elementBottom = elem.offset().left - containerTopOffset + elem.width();
    //             } else {
    //               elementBottom = elem.offset().top - containerTopOffset + elem.height();
    //             }
    //           }
    //           if (useDocumentBottom) {
    //             if (scrollHorizontal) {
    //               elementBottom = $(document).width();
    //             } else {
    //               elementBottom = $(document).height();
    //             }
    //           }
    //           remaining = elementBottom - containerBottom;
    //           if (scrollHorizontal) {
    //             shouldScroll = remaining <= container.width() * scrollDistance + 1;
    //           } else {
    //             shouldScroll = remaining <= container.height() * scrollDistance + 1;
    //           }
    //           if (shouldScroll) {
    //             checkWhenEnabled = true;
    //             if (scrollEnabled) {
    //               if (scope.$$phase || $rootScope.$$phase) {
    //                 return scope.infiniteScroll();
    //               } else {
    //                 return scope.$apply(scope.infiniteScroll);
    //               }
    //             }
    //           } else {
    //             return checkWhenEnabled = false;
    //           }
    //         };
    //         throttle = function(func, wait) {
    //           var later, previous, timeout;
    //           timeout = null;
    //           previous = 0;
    //           later = function() {
    //             var context;
    //             previous = new Date().getTime();
    //             $timeout.cancel(timeout);
    //             timeout = null;
    //             func.call();
    //             return context = null;
    //           };
    //           return function() {
    //             var now, remaining;
    //             now = new Date().getTime();
    //             remaining = wait - (now - previous);
    //             if (remaining <= 0) {
    //               clearTimeout(timeout);
    //               $timeout.cancel(timeout);
    //               timeout = null;
    //               previous = now;
    //               return func.call();
    //             } else {
    //               if (!timeout) {
    //                 return timeout = $timeout(later, remaining);
    //               }
    //             }
    //           };
    //         };
    //         if (THROTTLE_MILLISECONDS != null) {
    //           handler = throttle(handler, THROTTLE_MILLISECONDS);
    //         }
    //         scope.$on('$destroy', function() {
    //           return container.off('scroll', handler);
    //         });
    //         handleInfiniteScrollHorizontal = function (v) {
    //           scrollHorizontal = v;
    //         };
    //         scope.$watch('infiniteScrollHorizontal', handleInfiniteScrollHorizontal);
    //         handleInfiniteScrollHorizontal(scope.infiniteScrollHorizontal);
    //
    //         handleInfiniteScrollDistance = function(v) {
    //           return scrollDistance = parseInt(v, 10) || 0;
    //         };
    //         scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
    //         handleInfiniteScrollDistance(scope.infiniteScrollDistance);
    //         handleInfiniteScrollDisabled = function(v) {
    //           scrollEnabled = !v;
    //           if (scrollEnabled && checkWhenEnabled) {
    //             checkWhenEnabled = false;
    //             return handler();
    //           }
    //         };
    //         scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
    //         handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
    //         handleInfiniteScrollUseDocumentBottom = function(v) {
    //           return useDocumentBottom = v;
    //         };
    //         scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
    //         handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
    //         changeContainer = function(newContainer) {
    //           if (container != null) {
    //             container.off('scroll', handler);
    //           }
    //           container = typeof newContainer.last === 'function' && newContainer !== $window ? newContainer.last() : newContainer;
    //           if (newContainer != null) {
    //             return container.on('scroll', handler);
    //           }
    //         };
    //         changeContainer($window);
    //         handleInfiniteScrollContainer = function(newContainer) {
    //           if ((!(newContainer != null)) || newContainer.length === 0) {
    //             return;
    //           }
    //           newContainer = angular.element(newContainer);
    //           if (newContainer != null) {
    //             return changeContainer(newContainer);
    //           } else {
    //             throw new Exception("invalid infinite-scroll-container attribute.");
    //           }
    //         };
    //         scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
    //         handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
    //         if (attrs.infiniteScrollParent != null) {
    //           changeContainer(angular.element(elem.parent()));
    //         }
    //         if (attrs.infiniteScrollImmediateCheck != null) {
    //           immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
    //         }
    //         return $timeout((function() {
    //           if (immediateCheck) {
    //             return handler();
    //           }
    //         }), 0);
    //       }
    //     };
    //   }
    // ]);





// angular.module('ash', []).directive("ngInfiniteScroll", function ($timeout, Data, Resource) {
//
//   return {
//     restrict: 'A',
//     scope: {
//       options: '=',
//       items: '='
//     },
//     link: function ($scope, element) {
//       $scope.lastRemain = undefined;
//       $scope.offset = 0;
//       $scope.inProcess = false;
//       $scope.options = angular.extend({
//         limit: 10,
//         threshold: 50,
//         data: []
//       }, $scope.options);
//       $scope.hasItems = true;
//
//       if (!$scope.options.resource && !Array.isArray($scope.options.data)) {
//         $scope.options.data = [$scope.options.data];
//       }
//       $scope.strategy = $scope.options.resource ? Resource : Data;
//       $scope.strategy.addItems($scope);
//
//       element.bind('scroll', function () {
//         var remain = element[0].scrollHeight - (element[0].clientHeight + element[0].scrollTop);
//
//         if (remain < $scope.options.threshold && (!$scope.lastRemain || (remain - $scope.lastRemain) < 0) && $scope.hasItems && !$scope.inProcess) {
//           $scope.$apply(function() {
//             $scope.strategy.addItems($scope);
//           });
//         }
//
//         $scope.lastRemain = remain;
//       });
//     }
//   }
//
// });
//
// app.factory('Data', function() {
//   return {
//     addItems: function($scope) {
//       $scope.inProcess = true;
//
//       var from = $scope.offset * $scope.options.limit;
//       if (from < $scope.options.data.length) {
//         var to = from + $scope.options.limit;
//         to = to > $scope.options.data.length ? $scope.options.data.length : to;
//
//         for (var i = from; i < to; i++) {
//           $scope.items = $scope.items.concat($scope.options.data[i]);
//         }
//
//         $scope.offset++;
//       } else {
//         $scope.hasItems = false;
//       }
//
//       $scope.inProcess = false;
//     }
//   };
// });
//
// app.factory('Resource', function() {
//   return {
//     addItems: function($scope) {
//       $scope.inProcess = true;
//       $scope.options.resource.query(
//         { offset: $scope.offset * $scope.options.limit, limit: $scope.options.limit },
//         function (data) {
//           if (data.models.length == 0) {
//             $scope.hasItems = false;
//           } else {
//             for (var i = 0; i < data.models.length; i++) {
//               $scope.items = $scope.items.concat(data.models[i]);
//             }
//           }
//
//           $scope.inProcess = false;
//         }
//       );
//
//     }
//   };
// });
