(function () {

	'use strict';

	/* @ngInject */
	function CmiController($scope, $rootScope, $state, $stateParams, CurrentFinca, header, navbar) {

		$scope.title = 'Resumen Global';
		$scope.fincaName = CurrentFinca.fincaCur().fincaname;
		$scope.ejercCurso = CurrentFinca.fincaCur().ejercCurso;

		$rootScope.headerItem = header;
		$rootScope.navbarItems = navbar;

		$scope.toggleGroup = function(group) {
			if ($scope.isGroupShown(group)) {
				$scope.shownGroup = null;
			} else {
				$scope.shownGroup = group;
			}
		};
		$scope.isGroupShown = function(group) {
			return $scope.shownGroup === group;
		};

	}

	angular
	.module('App')
	.controller('CmiController', CmiController);

})();

(function () {

	'use strict';

	/* @ngInject */
	function CmiEspecController ($scope, $rootScope, $state, $stateParams, CurrentFinca, especName) {

		$scope.especCursoName = especName;

	}

	angular
	.module('App')
	.controller('CmiEspecController', CmiEspecController);

})();

(function () {

	'use strict';

	/* @ngInject */
	function CmiTotalController ($scope, $rootScope, $state, $stateParams, CurrentFinca, diarios, totales, amortizacion, reparto) {

		$scope.diarios = diarios;
		$scope.totales = totales;
		$scope.reparto = reparto;
		$scope.getTotalCult = function(){
			var sum = totales.reduce(function(memo, res) {
				return memo + res.materiales + res.maquinaria + res.otros + res.mobra;
			}, 0);
			return sum;
		};
		$scope.amortizacion = amortizacion;
		$scope.getTotalAmort = function(){
			var sum = amortizacion.reduce(function(memo, res) {
				return memo + res.amort;
			}, 0);
			return sum;
		};
	}

	angular
	.module('App')
	.controller('CmiTotalController', CmiTotalController);

})();
