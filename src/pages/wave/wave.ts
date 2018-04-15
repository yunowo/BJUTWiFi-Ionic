import { Component, Input, AfterViewInit } from "@angular/core";

@Component({
  selector: 'page-wave',
  templateUrl: 'wave.html'
})
export class WavePage implements AfterViewInit {
  @Input() progress: number;
  waveLoadingD: String;
  waveLoadingShadowD: String;
  private static swing = 10;
  private i = 0;
  private j = 0;

  constructor() { }

  ngAfterViewInit() {
    requestAnimationFrame(this.draw.bind(this));
  }

  private create_wave(width, height, waveLength, swing, percent, offset, distance) {
    offset = offset % waveLength;
    percent = percent.toFixed(2);
    const circle = ((width / waveLength) >> 0) + 2;
    let d = `M ${(-offset) >> 0} ${((1 - percent) * height) >> 0}`;
    let d1 = `M ${(-offset + distance) >> 0} ${((1 - percent) * height) >> 0}`;

    for (let i = 0; i < circle; i++) {
      d += `Q ${(i * waveLength + waveLength / 4 - offset) >> 0} ${((1 - percent) * height - swing) >> 0} ,${(i * waveLength + (waveLength / 2) - offset) >> 0} ${((1 - percent) * height) >> 0}`;
      d += `Q ${(i * waveLength + (waveLength * 3 / 4) - offset) >> 0} ${((1 - percent) * height + swing) >> 0},${(i * waveLength + waveLength - offset) >> 0} ${((1 - percent) * height) >> 0}`;

      d1 += `Q ${(i * waveLength + waveLength / 4 - offset + distance) >> 0} ${((1 - percent) * height - swing) >> 0} ,${(i * waveLength + (waveLength / 2) - offset + distance) >> 0} ${((1 - percent) * height) >> 0}`;
      d1 += `Q ${(i * waveLength + (waveLength * 3 / 4) - offset + distance) >> 0} ${((1 - percent) * height + swing) >> 0},${(i * waveLength + waveLength - offset + distance) >> 0} ${((1 - percent) * height) >> 0}`;
    }
    d += `V ${height} H ${(-offset) >> 0} V ${((1 - percent) * height) >> 0} z`;
    d1 += `V ${height} H ${(-offset + distance) >> 0} V ${((1 - percent) * height) >> 0} z`;
    this.waveLoadingD = d;
    this.waveLoadingShadowD = d1;
  };

  draw() {
    if (this.i < this.progress) {
      this.create_wave(150, 150, 250, WavePage.swing, (this.i++) / 100, (this.j++) * 4, 110);
    } else if (this.i === this.progress) {
      this.create_wave(150, 150, 250, WavePage.swing, this.progress / 100, (this.j++) * 4, 110);
    } else if (this.i > this.progress) {
      this.create_wave(150, 150, 250, WavePage.swing, (this.i--) / 100, (this.j++) * 4, 110);
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}
