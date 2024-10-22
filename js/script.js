$(document).ready(function() {
	
	$("#txtCnpj").mask("99.999.999/9999-99");
	
	$("#btnConsultar").on("click", function() {
		
		if ($("#txtCnpj").val() != "") {
			
			if (validarCnpj($("#txtCnpj").val())) {
				
				setAguarde();
				
				$.ajax({
					url: "https://receitaws.com.br/v1/cnpj/" + $("#txtCnpj").val().replace(/[^\d]+/g, ""),
					type: "GET",
					crossDomain: true,
					dataType: "jsonp",
					success: function(dados) {
						$("#txtNumInsc").val(dados.cnpj + " - " + dados.tipo);
						$("#txtDtAbertura").val(dados.abertura + " (" + calcularPeriodo(dados.abertura) + " ANOS ATRÁS)");
						$("#txtNomeEmpr").val(dados.nome);
						$("#txtNomeFant").val(dados.fantasia == "" ? "SEM NOME FANTASIA" : dados.fantasia);
						$("#txtCodDescNatJur").val(dados.natureza_juridica.toUpperCase());
						
						var ativPrim = JSON.parse(JSON.stringify(dados.atividade_principal));
						$("#txtAtivEconoPrim").val(ativPrim[0].code + " - " + ativPrim[0].text.toUpperCase());
						
						$("#txtCapitalSocial").val(formatarMoeda(dados.capital_social));
						$("#txtSitCad").val(dados.situacao);
						$("#txtDtSitCad").val(dados.data_situacao + " (" + calcularPeriodo(dados.data_situacao) + " ANOS ATRÁS)");
						$("#txtMotSitCad").val(dados.motivo_situacao == "" ? "SEM MOTIVO" : dados.motivo_situacao);
						$("#txtPorte").val(dados.porte);
						$("#txtUltimaAtual").val(formatarData(dados.ultima_atualizacao));
						$("#txtLogradouro").val(dados.logradouro);
						$("#txtNumLogradouro").val(dados.numero);
						$("#txtCompLogradouro").val(dados.complemento == "" ? "SEM COMPLEMENTO" : dados.complemento);
						$("#txtCepLogradouro").val(dados.cep);
						$("#txtBairroLogradouro").val(dados.bairro);
						$("#txtMunicLogradouro").val(dados.municipio);
						$("#txtUfLogradouro").val(dados.uf);
						$("#txtTelefone").val(dados.telefone);
						$("#txtEmail").val(dados.email == "" ? "SEM E-MAIL" : dados.email.toUpperCase());
						$("#txtStatus").val(dados.status);
					}
				});
				
			} else {
				
				Swal.fire({
					title: "Oops!",
					text: "Informe um CNPJ válido!",
					icon: "error"
				});
				
			}
			
		} else {
			
			Swal.fire({
				title: "Oops!",
				text: "Informe um CNPJ para consultar!",
				icon: "error"
			});
			
		}
		
	});
	
	$("#btnLimpar").on("click", function() {
		
		$("#txtNumInsc").val("");
		$("#txtDtAbertura").val("");
		$("#txtNomeEmpr").val("");
		$("#txtNomeFant").val("");
		$("#txtCodDescNatJur").val("");
		$("#txtAtivEconoPrim").val("");
		$("#txtCapitalSocial").val("");
		$("#txtSitCad").val("");
		$("#txtDtSitCad").val("");
		$("#txtMotSitCad").val("");
		$("#txtPorte").val("");
		$("#txtUltimaAtual").val("");
		$("#txtLogradouro").val("");
		$("#txtNumLogradouro").val("");
		$("#txtCompLogradouro").val("");
		$("#txtCepLogradouro").val("");
		$("#txtBairroLogradouro").val("");
		$("#txtMunicLogradouro").val("");
		$("#txtUfLogradouro").val("");
		$("#txtTelefone").val("");
		$("#txtEmail").val("");
		$("#txtStatus").val("");
		$("#txtCnpj").val("");
		$("#txtCnpj").focus();
		
	});
	
});

function validarCnpj(cnpj) {
	cnpj = cnpj.replace(/[^\d]+/g, "");
	
	if (cnpj.length != 14) return false;
	
	if (cnpj == "00000000000000" || cnpj == "11111111111111" ||
	    cnpj == "22222222222222" || cnpj == "33333333333333" ||
		cnpj == "44444444444444" || cnpj == "55555555555555" ||
		cnpj == "66666666666666" || cnpj == "77777777777777" ||
		cnpj == "88888888888888" || cnpj == "99999999999999") return false;
		
	var tam = cnpj.length - 2;
	var num = cnpj.substring(0, tam);
	var dig = cnpj.substring(tam);
	var pos = tam - 7;
	var soma = 0;
	
	for (var i = tam; i >= 1; i--) {
		soma += num.charAt(tam - i) * pos--;
		if (pos < 2) pos = 9;
	}
	
	var result = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (result != dig.charAt(0)) return false;
	
	tam = tam + 1;
	num = cnpj.substring(0, tam);
    pos = tam - 7;
	soma = 0;
	
	for (var i = tam; i >= 1; i--) {
		soma += num.charAt(tam - i) * pos--;
		if (pos < 2) pos = 9;
	}
	
	result = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (result != dig.charAt(1)) return false;
	
	return true;
}

function setAguarde() {
	$("#txtNumInsc").val("Aguarde..");
	$("#txtDtAbertura").val("Aguarde..");
	$("#txtNomeEmpr").val("Aguarde..");
	$("#txtNomeFant").val("Aguarde..");
	$("#txtCodDescNatJur").val("Aguarde..");
	$("#txtAtivEconoPrim").val("Aguarde..");
	$("#txtCapitalSocial").val("Aguarde..");
	$("#txtSitCad").val("Aguarde..");
	$("#txtDtSitCad").val("Aguarde..");
	$("#txtMotSitCad").val("Aguarde..");
	$("#txtPorte").val("Aguarde..");
	$("#txtUltimaAtual").val("Aguarde..");
	$("#txtLogradouro").val("Aguarde..");
	$("#txtNumLogradouro").val("Aguarde..");
	$("#txtCompLogradouro").val("Aguarde..");
	$("#txtCepLogradouro").val("Aguarde..");
	$("#txtBairroLogradouro").val("Aguarde..");
	$("#txtMunicLogradouro").val("Aguarde..");
	$("#txtUfLogradouro").val("Aguarde..");
	$("#txtTelefone").val("Aguarde..");
	$("#txtEmail").val("Aguarde..");
	$("#txtStatus").val("Aguarde..");
}

function formatarMoeda(moedaString) {
	return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(moedaString);
}

function calcularPeriodo(dataInicial) {
	var dataAtual = new Date();
	var diaAtual = dataAtual.getDate();
	var mesAtual = dataAtual.getMonth() + 1;
	var anoAtual = dataAtual.getFullYear();
	var inicialParts = dataInicial.split("/");
	var dia = inicialParts[0];
	var mes = inicialParts[1];
	var ano = inicialParts[2];
	var idade = anoAtual - ano;
	
	if (mesAtual < mes) {
		idade--;
	} else {
		if (mesAtual == mes) {
			if (diaAtual < dia) {
				idade--;
			}
		}
	}
	
	return idade;
}

function formatarData(dataString) {
	var data = new Date(dataString);
	
	var ano = data.getFullYear();
    var mes = data.getMonth() + 1;
    var dia = data.getDate();
    var horas = data.getHours();
    var minutos = data.getMinutes();
    var segundos = data.getSeconds();
	
	return dia + "/" + mes + "/" + ano + " às " + horas + ":" + minutos + ":" + segundos;
}