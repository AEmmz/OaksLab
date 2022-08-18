export default {
	async changeActivePokemon(context, payload) {
		try {
			let pokemon = payload.api;
			let pokemonInfo;

			//Vivillon Check
			if (pokemon >= 20100 && pokemon <= 20119) {
				let vivillonId;
				if (+pokemon === 20100) vivillonId = 10094;
				if (+pokemon === 20101) vivillonId = 10089;
				if (+pokemon === 20102) vivillonId = 10091;
				if (+pokemon === 20103) vivillonId = 10161;
				if (+pokemon === 20104) vivillonId = 10090;
				if (+pokemon === 20105) vivillonId = 10095;
				if (+pokemon === 20106) vivillonId = 10086;
				if (+pokemon === 20107) vivillonId = 10102;
				if (+pokemon === 20108) vivillonId = 10093;
				if (+pokemon === 20109) vivillonId = 10092;
				if (+pokemon === 20110) vivillonId = 10098;
				if (+pokemon === 20111) vivillonId = 10101;
				if (+pokemon === 20112) vivillonId = 10162;
				if (+pokemon === 20114) vivillonId = 10087;
				if (+pokemon === 20115) vivillonId = 10097;
				if (+pokemon === 20116) vivillonId = 10096;
				if (+pokemon === 20117) vivillonId = 10099;
				if (+pokemon === 20118) vivillonId = 10100;
				if (+pokemon === 20119) vivillonId = 10088;
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon-form/${vivillonId}`
				);
				pokemonInfo = await response.json();
				pokemonInfo.id = pokemon;
			}
			//Unown Check
			else if (pokemon >= 20200 && pokemon <= 20226) {
				let unownId;
				if (+pokemon === 20200) unownId = 10001;
				if (+pokemon === 20201) unownId = 10002;
				if (+pokemon === 20202) unownId = 10003;
				if (+pokemon === 20203) unownId = 10004;
				if (+pokemon === 20204) unownId = 10005;
				if (+pokemon === 20205) unownId = 10006;
				if (+pokemon === 20206) unownId = 10007;
				if (+pokemon === 20207) unownId = 10008;
				if (+pokemon === 20208) unownId = 10009;
				if (+pokemon === 20209) unownId = 10010;
				if (+pokemon === 20210) unownId = 10011;
				if (+pokemon === 20211) unownId = 10012;
				if (+pokemon === 20212) unownId = 10013;
				if (+pokemon === 20213) unownId = 10014;
				if (+pokemon === 20214) unownId = 10015;
				if (+pokemon === 20215) unownId = 10016;
				if (+pokemon === 20216) unownId = 10017;
				if (+pokemon === 20217) unownId = 10018;
				if (+pokemon === 20218) unownId = 10019;
				if (+pokemon === 20219) unownId = 10020;
				if (+pokemon === 20220) unownId = 10021;
				if (+pokemon === 20221) unownId = 10022;
				if (+pokemon === 20222) unownId = 10023;
				if (+pokemon === 20223) unownId = 10024;
				if (+pokemon === 20224) unownId = 10025;
				if (+pokemon === 20225) unownId = 10026;
				if (+pokemon === 20226) unownId = 10027;
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${unownId}`);
				pokemonInfo = await response.json();
				pokemonInfo.id = pokemon;
			}

			//Alcremie Check
			else if (pokemon >= 20300 && pokemon <= 20400) {
				let alcremieId;
				//Strawberry
				if (+pokemon === 20300) alcremieId = 10346;
				if (+pokemon === 20301) alcremieId = 10347;
				if (+pokemon === 20302) alcremieId = 10348;
				if (+pokemon === 20303) alcremieId = 10349;
				if (+pokemon === 20304) alcremieId = 10350;
				if (+pokemon === 20305) alcremieId = 10351;
				if (+pokemon === 20306) alcremieId = 10352;
				if (+pokemon === 20307) alcremieId = 10353;
				//Berry
				if (+pokemon === 20309) alcremieId = 869;
				if (+pokemon === 20310) alcremieId = 10346;
				if (+pokemon === 20311) alcremieId = 10347;
				if (+pokemon === 20312) alcremieId = 10348;
				if (+pokemon === 20313) alcremieId = 10349;
				if (+pokemon === 20314) alcremieId = 10350;
				if (+pokemon === 20315) alcremieId = 10351;
				if (+pokemon === 20316) alcremieId = 10352;
				if (+pokemon === 20317) alcremieId = 10353;
				//Love
				if (+pokemon === 20319) alcremieId = 869;
				if (+pokemon === 20320) alcremieId = 10346;
				if (+pokemon === 20321) alcremieId = 10347;
				if (+pokemon === 20322) alcremieId = 10348;
				if (+pokemon === 20323) alcremieId = 10349;
				if (+pokemon === 20324) alcremieId = 10350;
				if (+pokemon === 20325) alcremieId = 10351;
				if (+pokemon === 20326) alcremieId = 10352;
				if (+pokemon === 20327) alcremieId = 10353;
				//Star
				if (+pokemon === 20329) alcremieId = 869;
				if (+pokemon === 20330) alcremieId = 10346;
				if (+pokemon === 20331) alcremieId = 10347;
				if (+pokemon === 20332) alcremieId = 10348;
				if (+pokemon === 20333) alcremieId = 10349;
				if (+pokemon === 20334) alcremieId = 10350;
				if (+pokemon === 20335) alcremieId = 10351;
				if (+pokemon === 20336) alcremieId = 10352;
				if (+pokemon === 20337) alcremieId = 10353;
				//Clover
				if (+pokemon === 20339) alcremieId = 869;
				if (+pokemon === 20340) alcremieId = 10346;
				if (+pokemon === 20341) alcremieId = 10347;
				if (+pokemon === 20342) alcremieId = 10348;
				if (+pokemon === 20343) alcremieId = 10349;
				if (+pokemon === 20344) alcremieId = 10350;
				if (+pokemon === 20345) alcremieId = 10351;
				if (+pokemon === 20346) alcremieId = 10352;
				if (+pokemon === 20347) alcremieId = 10353;
				//Flower
				if (+pokemon === 20349) alcremieId = 869;
				if (+pokemon === 20350) alcremieId = 10346;
				if (+pokemon === 20351) alcremieId = 10347;
				if (+pokemon === 20352) alcremieId = 10348;
				if (+pokemon === 20353) alcremieId = 10349;
				if (+pokemon === 20354) alcremieId = 10350;
				if (+pokemon === 20355) alcremieId = 10351;
				if (+pokemon === 20356) alcremieId = 10352;
				if (+pokemon === 20357) alcremieId = 10353;
				//Ribbon
				if (+pokemon === 20359) alcremieId = 869;
				if (+pokemon === 20360) alcremieId = 10346;
				if (+pokemon === 20361) alcremieId = 10347;
				if (+pokemon === 20362) alcremieId = 10348;
				if (+pokemon === 20363) alcremieId = 10349;
				if (+pokemon === 20364) alcremieId = 10350;
				if (+pokemon === 20365) alcremieId = 10351;
				if (+pokemon === 20366) alcremieId = 10352;
				if (+pokemon === 20367) alcremieId = 10353;

				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon-form/${alcremieId}`
				);
				pokemonInfo = await response.json();
				pokemonInfo.id = pokemon;
			}

			//Misc Form Check
			else if (pokemon >= 20500 && pokemon <= 20599) {
				let formId;
				if (+pokemon === 20500) formId = 10039;
				if (+pokemon === 20501) formId = 10040;
				if (+pokemon === 20502) formId = 10034;
				if (+pokemon === 20503) formId = 10035;
				if (+pokemon === 20504) formId = 10068;
				if (+pokemon === 20505) formId = 10069;
				if (+pokemon === 20506) formId = 10070;
				if (+pokemon === 20507) formId = 10071;
				if (+pokemon === 20508) formId = 10072;
				if (+pokemon === 20509) formId = 10073;
				if (+pokemon === 20510) formId = 10103;
				if (+pokemon === 20511) formId = 10104;
				if (+pokemon === 20512) formId = 10105;
				if (+pokemon === 20513) formId = 10106;
				if (+pokemon === 20514) formId = 10107;
				if (+pokemon === 20515) formId = 10108;
				if (+pokemon === 20516) formId = 10109;
				if (+pokemon === 20517) formId = 10110;
				if (+pokemon === 20518) formId = 10111;
				if (+pokemon === 20519) formId = 10112;
				if (+pokemon === 20520) formId = 10113;
				if (+pokemon === 20521) formId = 10114;
				if (+pokemon === 20522) formId = 10344;
				if (+pokemon === 20523) formId = 10345;
				if (+pokemon === 20524) formId = 592;
				if (+pokemon === 20525) formId = 593;
				if (+pokemon === 20526) formId = 10115;
				if (+pokemon === 20527) formId = 10116;
				if (+pokemon === 20528) formId = 10117;
				if (+pokemon === 20529) formId = 10118;
				if (+pokemon === 20530) formId = 10119;
				if (+pokemon === 20531) formId = 10120;
				if (+pokemon === 20532) formId = 10121;
				if (+pokemon === 20533) formId = 10122;
				if (+pokemon === 20534) formId = 10123;

				const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${formId}`);
				pokemonInfo = await response.json();
				pokemonInfo.id = pokemon;
			}

			//Standard Pokemon Query
			else {
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
				pokemonInfo = await response.json();
			}
			pokemonInfo = {
				...pokemonInfo,
				dexNo: payload.dex,
				setName: payload.name,
				setType: payload.types,
			};
			context.commit('changeActivePokemon', pokemonInfo);
			if (context.rootGetters['authorization/isLoggedIn']) {
				context.dispatch('caught/caughtCheck', pokemonInfo);
			}
		} catch (err) {
			console.log(err);
		}
	},
};
