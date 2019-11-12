/**
 * gvSIG Online.
 * Copyright (C) 2010-2017 SCOLAB.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @author: Javier Rodrigo <jrodrigo@scolab.es>
 */

/**
 * TODO
 */
var CleanDrawControl = function(drawBar, pointLayer, lineLayer, polygonLayer, textLayer) {
	var self = this;
	this.drawBar = drawBar;

	this.control = new ol.control.Toggle({	
		html: '<i class="fa fa-eraser" ></i>',
		className: "edit",
		title: gettext('Clean drawings'),
		onToggle: function(active){
			pointLayer.getSource().clear();
			lineLayer.getSource().clear();
			polygonLayer.getSource().clear();
			textLayer.getSource().clear();
			this.toggle();
		}
	});
	this.drawBar.addControl(this.control);

};