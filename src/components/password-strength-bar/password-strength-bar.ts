import {Component, OnChanges, Input, SimpleChange} from '@angular/core';

@Component({
    selector: 'password-strength-bar',
    templateUrl: 'password-strength-bar.html'
})
export class PasswordStrengthBar implements OnChanges {
    @Input() passwordToCheck: string;
    @Input() barLabel: string;
    bar0: string;
    bar1: string;
    bar2: string;

    private colors = ['#ff5722', '#ffc107', '#8bc34a'];

    private static measureStrength(p) {
        var _force = 0;
        var _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "

        var _lowerLetters = /[a-z]+/.test(p);
        var _upperLetters = /[A-Z]+/.test(p);
        var _numbers = /[0-9]+/.test(p);
        var _symbols = _regex.test(p);

        var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

        var _passedMatches = 0;
        for (let _flag of _flags) {
            _passedMatches += _flag === true ? 1 : 0;
        }

        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        _force += _passedMatches * 10;

        // penality (short password)
        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

        // penality (poor variety of characters)
        _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
        _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
        _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

        return _force;

    }
    private getColor(s) {
        var idx = 0;
        if (s <= 10) {
            idx = 0;
        }
        else if (s <= 20) {
            idx = 1;
        }
        else if (s <= 30) {
            idx = 1;
        }
        else if (s <= 40) {
            idx = 2;
        }
        else {
            idx = 2;
        }
        return {
            idx: idx + 1,
            col: this.colors[idx]
        };
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        var password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, '#DDD');
        if (password) {
            let c = this.getColor(PasswordStrengthBar.measureStrength(password));
            this.setBarColors(c.idx, c.col);
        }
    }
    private setBarColors(count, col) {
        for (let _n = 0; _n < count; _n++) {
            this['bar' + _n] = col;
        }
    }
}
