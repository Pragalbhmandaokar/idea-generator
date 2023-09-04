
let categories = {};
let recently_used = [];
let character_is_group = false;
let character_post_description = '';
window.onload = function onLoad() {
	// Store list of entries by category name
	for (let i = 0; i < category_names.length; i ++) {
		name = category_names[i];
		categories[name] = getCategory(name);
	}
}
function generate() {
	reset();
	let template = pickRandom('template');
	let result = fillInTemplate(template);
	result = formatOutput(result);
	document.getElementById("content").innerHTML = result;
}
function reset() {
	character_post_description = '';
	recently_used.length = 0;
	character_is_group = false;
}


function fillInTemplate(template) {
	if (template.includes('@')) {
		let command = getTextBetweenTags(template, '@', '@');
		let replacement = 'NO REPLACEMENT FOUND';
		let generator = command.split(':')[0];
		let parameters = [];
		if (command.includes(':')) {
			parameters = command.split(':')[1].split(',');
		}
		switch (generator) {
			case 'character':
				replacement = generateCharacter(parameters);
				break;
			case 'character_description':
				replacement = pickRandom('character_description');
				break;
			case 'goal':
				replacement = generateGoal();
				break;
			case 'genre':
				replacement = generateGenre(parameters);
				break;
			case 'wildcard':
				replacement = generateWildcard(parameters);
				break;
			case 'mood':
				replacement = generateMood();
				break;
			case 'setting':
				replacement = generateSetting();
				break;
			case 'setting_description':
				replacement = pickRandomOrNone('setting_description', 0.7);
				break;
			case 'theme':
				replacement = generateTheme();
				break;
		}

		template = replaceTextBetweenTags(template, replacement, '@', '@');
		// recursively fill in all generators
		return fillInTemplate(template);
	}

function getCategory(category_name) {
	let start_tag = `#${category_name}:\n`;
	let end_tag = '\n#end';
	return getTextBetweenTags(data, start_tag, end_tag).split('\n');
}

function pickRandomOrNone(category_name, probability_exists) {
	if (randomChance(probability_exists)) {
		return pickRandom(category_name);
	}
	return '';
}
