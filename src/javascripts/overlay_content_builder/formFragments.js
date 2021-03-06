const fieldsetTemplate = require('../../templates/formFragments/fieldset.html');
const pseudonymTemplate = require('../../templates/formFragments/pseudonym.html');
const emailSettingsTemplate = require('../../templates/formFragments/emailSettings.html');
const explanationTemplate = require('../../templates/formFragments/explanation.html');
const sessionExpiredTemplate = require('../../templates/formFragments/sessionExpired.html');

/**
 * Form fragment that contains setting the initial pseudonym.
 * @return {String} Mustache template
 */
exports.initialPseudonym = function () {
	return fieldsetTemplate({
		legend: 'Pseudonym',
		content: pseudonymTemplate({
			name: 'pseudonym',
			label: 'In order to use the commenting system, please choose a pseudonym.',
			currentPseudonym: ''
		})
	});
};

/**
 * Form fragment that contains changing the initial pseudonym.
 * @param  {Object} config Configuration object. If a pseudonym exists, it should be set in config.currentPseudonym.
 * @return {String} Mustache template
 */
exports.changePseudonym = function (config) {
	return fieldsetTemplate({
		legend: 'Pseudonym',
		content: pseudonymTemplate({
			name: 'pseudonym',
			label: 'This is displayed with your comments. If you change it, previous '+
				'comments will also be attributed to the new pseudonym.',
			currentPseudonym: config.currentPseudonym || ''
		})
	});
};

/**
 * Form fragment that contains the form inputs for the email preferences.
 * @param  {Object} config Current settings.
 * @return {String} Mustache template
 */
const emailSettingsForm = function (config) {
	if (!config || typeof config !== 'object') {
		config = {};
	}

	config.emailcomments = config.emailcomments || "hourly";
	config.emailreplies = config.emailreplies || "immediately";
	config.emaillikes = config.emaillikes || "never";

	return emailSettingsTemplate({
		selects: [
			{
				name: 'emailreplies',
				label: 'Someone replies to my comments:',
				options: [
					{
						val: 'never',
						label: 'Never',
						selected: config.emailreplies === 'never' ? true : false
					},
					{
						val: 'immediately',
						label: 'Immediately',
						selected: config.emailreplies === 'immediately' ? true : false
					},
					{
						val: 'hourly',
						label: 'Hourly',
						selected: config.emailreplies === 'hourly' ? true : false
					}
				]
			},
			{
				name: 'emaillikes',
				label: 'Someone recommends my comments:',
				options: [
					{
						val: 'never',
						label: 'Never',
						selected: config.emaillikes === 'never' ? true : false
					},
					{
						val: 'immediately',
						label: 'Immediately',
						selected: config.emaillikes === 'immediately' ? true : false
					},
					{
						val: 'hourly',
						label: 'Hourly',
						selected: config.emaillikes === 'hourly' ? true : false
					}
				]
			},
			{
				name: 'emailcomments',
				label: 'Someone comments in a conversation I\'m following:',
				options: [
					{
						val: 'never',
						label: 'Never',
						selected: config.emailcomments === 'never' ? true : false
					},
					{
						val: 'immediately',
						label: 'Immediately',
						selected: config.emailcomments === 'immediately' ? true : false
					},
					{
						val: 'hourly',
						label: 'Hourly',
						selected: config.emailcomments === 'hourly' ? true : false
					}
				]
			}
		],
		checkboxes: [
			{
				name: 'emailautofollow',
				label: 'Check to automatically follow a conversation you comment on:',
				checked: config.emailautofollow === "on" ? true : false
			}
		]
	});
};

/**
 * Email settings fragment within a dialog that contains pseudonym as well.
 * @param  {Object} config Current settings.
 * @return {String} Mustache template
 */
exports.emailSettings = function (config) {
	return fieldsetTemplate({
		legend: 'Email Settings',
		content: 'Receive alerts when:<br/>' + emailSettingsForm(config.currentSettings)
	});
};

/**
 * Email settings fragment which is shown standalone within the dialog.
 * @param  {Object} config Current settings.
 * @return {String} Mustache template
 */
exports.emailSettingsStandalone = function (config) {
	return fieldsetTemplate({
		legend: 'Email Settings',
		content: emailSettingsForm(config.currentSettings)
	});
};

/**
 * Explanation with image of the Follow functionality.
 * @return {String} Mustache template
 */
exports.followExplanation = function () {
	return explanationTemplate({
		text: 'To receive email alerts about conversations that you\'re interested in, '+
			'click the \'follow\' button that now appears on the comment box.',
		type: 'follow'
	});
};

/**
 * Explanation with image of the commenting settings dialog.
 * @return {String} Mustache template
 */
exports.commentingSettingsExplanation = function () {
	return explanationTemplate({
		text: 'You can manage your settings in the Commenting settings panel above the comment box.',
		type: 'settings'
	});
};

/**
 * Session expired dialog content.
 * @return {String} Mustache template
 */
exports.sessionExpired = function () {
	return sessionExpiredTemplate({
		location: encodeURIComponent(document.location.href)
	});
};
