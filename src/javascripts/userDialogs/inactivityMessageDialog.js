const Overlay = require('o-overlay');
const OverlayFormContent = require('../overlay_content_builder/OverlayFormContent.js');

let shown = false;

/**
 * Shows a dialog with a sign in link to re-login after a session expire.
 * @param  {Object} callbacks Object with callback functions. Possible fields:
 *                                - submit: Required. Function that is called when the form is submitted
 *                                - close:  Optional. Function that is called when the dialog is closed.
 * @return {undefined}
 */
exports.show = function (callbacks) {
	if (shown === false) {
		if (typeof callbacks !== 'object' || !callbacks) {
			throw new Error("Callbacks not provided.");
		}

		if (typeof callbacks.submit !== 'function') {
			throw new Error("Submit callback not provided.");
		}

		shown = true;


		let form = new OverlayFormContent(
			{
				method: 'GET',
				action: '',
				name: 'sessionexpired',
				items: [
					{
						type: 'sessionExpired'
					}
				],
				buttons: [
					{
						type: 'submitButton',
						label: 'Sign in'
					},
					{
						type: 'cancelButton'
					}
				]
			}
		);

		let overlayInstance = new Overlay("oCommentUi_inactivityMessageDialog", {
			html: form.getContainerDomElement(),
			heading: {
				title: "Session expired"
			},
			modal: true
		});

		const onSubmitHandler = function (evt) {
			callbacks.submit();

			if (evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}

			return false;
		};
		form.getDomElement().addEventListener('submit', onSubmitHandler);

		const onCloseInternalHandler = function () {
			shown = false;

			if (form) {
				form.getFormDomElement().removeEventListener('submit', onSubmitHandler);
				form.getContainerDomElement().removeEventListener('oCommentUi.form.cancel', onCancelHandler);
				form.destroy();
				form = null;
			}

			if (overlayInstance) {
				overlayInstance.wrapper.removeEventListener('oOverlay.destroy', onCloseInternalHandler);
				overlayInstance = null;
			}

			if (typeof callbacks.close === 'function') {
				callbacks.close();
			}
		};

		overlayInstance.open();

		const onCancelHandler = function () {
			overlayInstance.close();
		};
		form.getDomElement().addEventListener('oCommentUi.form.cancel', onCancelHandler);
		overlayInstance.wrapper.addEventListener('oOverlay.destroy', onCloseInternalHandler);
	}
};
