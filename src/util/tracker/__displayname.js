export const displayName = (name) => {
	let pkName = name;

	//UpperCase First Letter
	// pkName = `${pkName[0].toUpperCase()}${pkName.slice(1)}`;

	//Regional
	// pkName = pkName.includes('-alola') ? `Alolan ${pkName.slice(0, -6)}` : pkName;
	// pkName = pkName.includes('-galar') ? `Galarian ${pkName.slice(0, -6)}` : pkName;
	// pkName = pkName.includes('-hisui') ? `Hisuian ${pkName.slice(0, -6)}` : pkName;

	//Mega
	// pkName = pkName.includes('-mega-x') ? ` Mega ${pkName.slice(0, -6)} X` : pkName;
	// pkName = pkName.includes('-mega-y') ? ` Mega ${pkName.slice(0, -6)} Y` : pkName;
	// pkName = pkName.includes('-mega') ? ` Mega ${pkName.slice(0, -5)}` : pkName;

	//Specific

	// if (pkName.toLowerCase() === 'gastrodon-east') pkName = `${pkName}  Sea`;
	// if (pkName.toLowerCase() === 'gastrodon') pkName = `${pkName} West Sea`;
	// if (pkName.toLowerCase() === 'shellos-east') pkName = `${pkName}  Sea`;
	// if (pkName.toLowerCase() === 'shellos') pkName = `${pkName} West Sea`;
	// if (pkName.toLowerCase() === 'sinistea') pkName = `${pkName} Phony`;
	// if (pkName.toLowerCase() === 'polteageist') pkName = `${pkName} Phony`;
	// if (pkName.toLowerCase() === 'wishiwashi-solo') pkName = `${pkName.slice(0, -5)}`;
	// if (pkName.toLowerCase() === 'aegislash-shield') pkName = `${pkName.slice(0, -7)}`;
	// if (pkName.toLowerCase() === 'flabebe') pkName = `${pkName} Red Flower`;
	// if (pkName.toLowerCase() === 'flabebe-yellow') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'flabebe-orange') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'flabebe-blue') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'flabebe-white') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'floette') pkName = `${pkName} Red Flower`;
	// if (pkName.toLowerCase() === 'floette-yellow') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'floette-orange') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'floette-blue') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'floette-white') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'florges') pkName = `${pkName} Red Flower`;
	// if (pkName.toLowerCase() === 'florges-yellow') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'florges-orange') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'florges-blue') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'florges-white') pkName = `${pkName}  Flower`;
	// if (pkName.toLowerCase() === 'meloetta-aria') pkName = `${pkName.slice(0, -5)}`;
	// if (pkName.toLowerCase() === 'sawsbuck') pkName = `${pkName} Spring`;
	// if (pkName.toLowerCase() === 'deerling') pkName = `${pkName} Spring`;
	// if (pkName.toLowerCase() === 'burmy') pkName = `${pkName} Plant Cloak`;
	// if (pkName.toLowerCase() === 'burmy') pkName = `${pkName} Plant Cloak`;
	// if (pkName.toLowerCase() === 'burmy') pkName = `${pkName} Plant Cloak`;
	// if (pkName.toLowerCase() === 'burmy-sandy') pkName = `${pkName}  Cloak`;
	// if (pkName.toLowerCase() === 'burmy-trash') pkName = `${pkName}  Cloak`;
	// if (pkName.toLowerCase() === 'wormadam-plant') pkName = `${pkName}  Cloak`;
	// if (pkName.toLowerCase() === 'wormadam-sandy') pkName = `${pkName}  Cloak`;
	// if (pkName.toLowerCase() === 'wormadam-trash') pkName = `${pkName}  Cloak`;
	// if (pkName.toLowerCase() === 'unown') pkName = `${pkName} A`;
	// if (pkName.toLowerCase() === 'unown-exclamation') pkName = `${pkName.slice(0, -11)} !`;
	// if (pkName.toLowerCase() === 'unown-question') pkName = `${pkName.slice(0, -9)} ?`;
	// if (pkName.toLowerCase() === 'vivillon') pkName = `${pkName} Meadow`;
	// if (pkName.toLowerCase() === 'nidoran-m') pkName = `${pkName.slice(0, -2)} Male`;
	// if (pkName.toLowerCase() === 'nidoran-f') pkName = `${pkName.slice(0, -2)} Female`;
	// if (pkName.toLowerCase() === 'calyrex-ice') pkName = `${pkName}  Rider`;
	// if (pkName.toLowerCase() === 'calyrex-shadow') pkName = `${pkName}  Rider`;
	// if (pkName.toLowerCase() === 'enamorus-incarnate') pkName = `${pkName.slice(0, -10)}`;
	// if (pkName.toLowerCase() === 'tornadus-incarnate') pkName = `${pkName.slice(0, -10)}`;
	// if (pkName.toLowerCase() === 'thundurus-incarnate') pkName = `${pkName.slice(0, -10)}`;
	// if (pkName.toLowerCase() === 'landorus-incarnate') pkName = `${pkName.slice(0, -10)}`;
	// if (pkName.toLowerCase() === 'pumpkaboo-average') pkName = `${pkName.slice(0, -8)}`;
	// if (pkName.toLowerCase() === 'gourgeist-average') pkName = `${pkName.slice(0, -8)}`;
	// if (pkName.toLowerCase() === 'oricorio-pau') pkName = `${pkName.slice(0, -1)}'u`;
	// if (pkName.toLowerCase() === 'zygarde-10-power-construct') pkName = `${pkName.slice(0, -16)}%`;
	// if (pkName.toLowerCase() === 'zygarde-50') pkName = `${pkName}%`;
	// if (pkName.toLowerCase() === 'darmanitan-standard') pkName = `${pkName.slice(0, -9)}`;
	// if (pkName.toLowerCase() === 'galarian darmanitan-galar-st') pkName = `${pkName.slice(0, -9)}`;
	// if (pkName.toLowerCase() === 'galarian darmanitan-gal') pkName = `${pkName.slice(0, -4)} Zen`;
	// if (pkName.toLowerCase() === 'necrozma-dusk') pkName = `${pkName}  Mane`;
	// if (pkName.toLowerCase() === 'necrozma-dawn') pkName = `${pkName}  Wing`;

	// if (pkName.includes('-')) {
	// 	const nameArray = pkName
	// 		.split('-')
	// 		.map((e) => `${e[0].toUpperCase()}${e.slice(1)}`)
	// 		.map((e) => e.replace(' ', ''));
	// 	pkName = nameArray.join(' ');
	// }

	return pkName;
};
