import { FilterByStatusPipe } from './filter-by-status.pipe';

xdescribe('FilterByStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
