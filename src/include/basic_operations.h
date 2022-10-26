#include <assert.h>

extern double power(double X, double Y);

double nthRoot(double radicand, double degree)
{
  double result;
  assert(degree != 0);
  result = power(radicand, (1 / degree));
  return result;
}
