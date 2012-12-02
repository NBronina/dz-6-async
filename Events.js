/*
* Collection - ����������� ��������� ��������
* Collection.prototype.add - ���������� ������� � ���������
*
* Events - ��������� ������� � ���������. ������ ����������� �� Collection
* 
* Event - ������ ������� � ���������
* Event.prototype.validate - ��������� ������������ ����� ������� 
* Events.prototype.filterToDate - ���������� ����������� ��� ��������� ������� � ����������� �� ��������� ��������� flag
* Events.prototype.FilterToParty - ���������� �������, � ������� � ��������/ �� �������� ������� � ����������� �� ��������� ��������� flag
* Events.prototype.sortToDate - ��������� ������� �� ����
* function str2date(s) - ����������� ������ � ���� 
*/
var Events = function (items) {
    "use strict";
    Collection.apply(this, arguments);
};
inherits(Events, Collection);

Events.prototype.constructor = Events;

function str2date(s) {
    "use strict";
    var dateParts = s.split('.');
    if (typeof dateParts[2] === 'string') {
        return new Date(dateParts[2], dateParts[1], dateParts[0]);
    }
    if (typeof dateParts[2] === 'undefined') {
        dateParts = s.split('-');
        return new Date(dateParts[0], dateParts[1], dateParts[2]);
    }
}

Events.prototype.filterToDate = function (flag) {
    "use strict";
    var result, collection;
    collection = this.elem;
    if (flag === -1) {
        result = collection.filter(function (collection) {
            var s = str2date(collection.start);
            return s < new Date();
        });
	} else {
        result = collection.filter(function (collection) {
            var s = str2date(collection.start);
            return s >= new Date();
        });
    }
    return result;
};

Events.prototype.FilterToParty = function (flag) {
    "use strict";
    var result, collection;
    collection = this.elem;
    if (flag === -1) {
        result = collection.filter(function (collection) {
            return collection.party === "�� ��������";
	    });
    } else {
        result = collection.filter(function (collection) {
	        return collection.party === "��������";
        });
    }
    return result;
};

Events.prototype.sortToDate = function () {
    "use strict";
    var collection = this.elem;
    collection.sort(function (a, b) {
        return str2date(a.start) > str2date(b.start) ? 1 : -1;
    });
    return collection;
};