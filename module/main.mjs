// Document classes
import { OPActor } from "./documents/actor.mjs";
import { OPItem } from "./documents/item.mjs";
// Sheet classes
import { OPActorSheet } from "./sheets/actor-sheet.mjs";
import { OPItemSheet } from "./sheets/item-sheet.mjs";
// helper classes
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { OP } from "./helpers/config.mjs";

Hooks.once("init", function(){
	// Init global object
	game.OP = {
		OPActor,
		OPItem
	};

	// Init config consts
	CONFIG.OP = OP;

	// Set document classes
	CONFIG.Actor.documentClass = OPActor;
	CONFIG.Item.documentClass = OPItem;

	// Register sheets
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("OnePieceD20", OPActorSheet, {makeDefault: true});
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("OnePieceD20", OPItemSheet, {makeDefault: true});

	//Preload Handlebars Templates
	return preloadHandlebarsTemplates();
});

Hooks.once("ready", function(){

});