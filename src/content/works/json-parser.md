---
title: "JSON Parser"
createdAt: 2022/12/22
description: "A JSON parser written in Rust for learning."
---

## Abstract

We introduce a new class of time-continuous recurrent neural
network models. Instead of declaring a learning system's dynamics by implicit nonlinearities, we construct networks of
linear first-order dynamical systems modulated via nonlinear
interlinked gates. The resulting models represent dynamical
systems with varying (i.e., liquid) time-constants coupled to
their hidden state, with outputs being computed by numerical differential equation solvers. These neural networks exhibit stable and bounded behavior, yield superior expressivity
within the family of neural ordinary differential equations,
and give rise to improved performance on time-series prediction tasks. To demonstrate these properties, we first take a
theoretical approach to find bounds over their dynamics, and
compute their expressive power by the trajectory length measure in a latent trajectory space. We then conduct a series of
time-series prediction experiments to manifest the approximation capability of Liquid Time-Constant Networks (LTCs)
compared to classical and modern RNNs[^1].

[^1]: Code and data are available at: https://github.com/raminmh/liquid_time_constant_networks

## 1 Introduction

Recurrent neural networks with continuous-time hidden
states determined by ordinary differential equations (ODEs),
are effective algorithms for modeling time series data that
are ubiquitously used in medical, industrial and business settings. The state of a neural ODE, $\bm{x}(t) \in \mathbb{R}^D$,
is defined by the solution of this equation (Chen et al. 2018): $d\bm{x}(t)/dt = f(\bm{x}(t), \bm{I}(t), t, \theta)$, with a neural network $f$ parametrized by
$\theta$. One can then compute the state using a numerical ODE
solver, and train the network by performing reverse-mode
automatic differentiation (Rumelhart, Hinton, and Williams
1986), either by gradient descent through the solver (Lechner et al. 2019), or by considering the solver as a black-box
(Chen et al. 2018; Dupont, Doucet, and Teh 2019; Gholami,
Keutzer, and Biros 2019) and apply the adjoint method (Pontryagin 2018). The open questions are: how expressive are
neural ODEs in their current formalism, and can we improve
their structure to enable richer representation learning and
expressiveness?
Rather than defining the derivatives of the hidden-state
directly by a neural network $f$, one can determine a more
stable continuous-time recurrent neural network (CT-RNN)
by the following equation (Funahashi and Nakamura 1993):
$\frac{d\bm{x}(t)}{dt} = - \frac{\bm{x}(t)}{\tau} + f(\bm{x}(t), \bm{I}(t), t, \theta)$
, in which the term $- \frac{\bm{x}(t)}{\tau}$ assists the autonomous system to reach an equilibrium state
with a time-constant $τ$ . $\bm{x}(t)$ is the hidden state, $\bm{I}(t)$ is the
input, t represents time, and $f$ is parametrized by $θ$.
We propose an alternative formulation: let the hidden state
flow of a network be declared by a system of linear ODEs of
the form: $d\bm{x}(t)/dt = -\bm{x}(t)/τ + \bm{S}(t)$, and let $\bm{S}(t) \in \mathbb{R}^M$
represent the following nonlinearity determined by $\bm{S}(t) = f(\bm{x}(t),\bm{I}(t), t, θ)(A-\bm{x}(t))$, with parameters $\theta$ and $A$. Then,
by plugging in S into the hidden states equation, we get

$$
\frac{d\bm{x}(t)}{dt} = -\left[ \frac{1}{\tau} + f(\bm{x}(t), \bm{I}(t), t, \theta) \right] \bm{x}(t) + f(\bm{x}(t), \bm{I}(t), t, \theta) A
$$

Eq. 1 manifests a novel time-continuous RNN instance with several features and benefits: **Liquid time-constant**.
A neural network with $f$ not only determines the derivative of the hidden state $\bm{x}(t)$, but also serves as an input-dependent varying time-constant ($\tau_{sys} = \frac{\tau}{1 + \tau f(\bm{x}(t), \bm{I}(t), t, \theta)}$) for the learning system

### Algorithm 1: LTC update by fused ODE Solver

---

**Parameters**: $\theta = \{\tau^{(N \times 1)}$ = time-constants, $\gamma^{(N \times 1)}$ = gates, $W^{(N \times N)}$ = weights, $b^{(N \times 1)}$ = biases, $A^{(N \times N)}$ = connectivity, $\bm{I}^{(N \times 1)}$ = input, $\bm{x}^{(N \times 1)}$ = hidden-state, $\bm{y}^{(M \times N)}$ = weights, $\gamma_r^{(M \times N)}$ = recurrennt weights, $\mu^{(N \times 1)}$ = biases $\}$,

---

$$
\mathbb{E}_{W^{(d)}_\|} \mathbb{E}_{W^{(d)}_\perp} \left[ \left( \sum_{i \in A_{W^{(d)}_\|}} \left( \left( ^{\|}W_\perp^{(d)} + ^{\perp}W_\perp^{(d)} \right)_i z_\perp^{(d)} + \left( ^{\|}W_\|^{(d)} + ^{\perp}W_\|^{(d)} \right)_i z_\|^{(d)} \right)^2 \right)^{1/2} \right]
$$

---

$$
\mathbb{E}_{W^{(d)}} \left[\left\| \frac{dz^{(d + 1)}}{dt} \right\| \right] = \mathbb{E}_{W^{(d)}_\|} \mathbb{E}_{W^{(d)}_\perp} \left[ \left( \sum_{i \in A_{W^{(d)}_\|}} \left( \left( ^{\|}W_\perp^{(d)} + ^{\perp}W_\perp^{(d)} \right)_i z_\perp^{(d)} + \left( ^{\|}W_\|^{(d)} + ^{\perp}W_\|^{(d)} \right)_i z_\|^{(d)} \right)^2 \right)^{1/2} \right]
$$

## Abstract

We introduce a new class of time-continuous recurrent neural
network models. Instead of declaring a learning system's dynamics by implicit nonlinearities, we construct networks of
linear first-order dynamical systems modulated via nonlinear
interlinked gates. The resulting models represent dynamical
systems with varying (i.e., liquid) time-constants coupled to
their hidden state, with outputs being computed by numerical differential equation solvers. These neural networks exhibit stable and bounded behavior, yield superior expressivity
within the family of neural ordinary differential equations,
and give rise to improved performance on time-series prediction tasks. To demonstrate these properties, we first take a
theoretical approach to find bounds over their dynamics, and
compute their expressive power by the trajectory length measure in a latent trajectory space. We then conduct a series of
time-series prediction experiments to manifest the approximation capability of Liquid Time-Constant Networks (LTCs)
compared to classical and modern RNNs[^1].

[^1]: Code and data are available at: https://github.com/raminmh/liquid_time_constant_networks

## 1 Introduction

Recurrent neural networks with continuous-time hidden
states determined by ordinary differential equations (ODEs),
are effective algorithms for modeling time series data that
are ubiquitously used in medical, industrial and business settings. The state of a neural ODE, $\bm{x}(t) \in \mathbb{R}^D$,
is defined by the solution of this equation (Chen et al. 2018): $d\bm{x}(t)/dt = f(\bm{x}(t), \bm{I}(t), t, \theta)$, with a neural network $f$ parametrized by
$\theta$. One can then compute the state using a numerical ODE
solver, and train the network by performing reverse-mode
automatic differentiation (Rumelhart, Hinton, and Williams
1986), either by gradient descent through the solver (Lechner et al. 2019), or by considering the solver as a black-box
(Chen et al. 2018; Dupont, Doucet, and Teh 2019; Gholami,
Keutzer, and Biros 2019) and apply the adjoint method (Pontryagin 2018). The open questions are: how expressive are
neural ODEs in their current formalism, and can we improve
their structure to enable richer representation learning and
expressiveness?
Rather than defining the derivatives of the hidden-state
directly by a neural network $f$, one can determine a more
stable continuous-time recurrent neural network (CT-RNN)
by the following equation (Funahashi and Nakamura 1993):
$\frac{d\bm{x}(t)}{dt} = - \frac{\bm{x}(t)}{\tau} + f(\bm{x}(t), \bm{I}(t), t, \theta)$
, in which the term $- \frac{\bm{x}(t)}{\tau}$ assists the autonomous system to reach an equilibrium state
with a time-constant $τ$ . $\bm{x}(t)$ is the hidden state, $\bm{I}(t)$ is the
input, t represents time, and $f$ is parametrized by $θ$.
We propose an alternative formulation: let the hidden state
flow of a network be declared by a system of linear ODEs of
the form: $d\bm{x}(t)/dt = -\bm{x}(t)/τ + \bm{S}(t)$, and let $\bm{S}(t) \in \mathbb{R}^M$
represent the following nonlinearity determined by $\bm{S}(t) = f(\bm{x}(t),\bm{I}(t), t, θ)(A-\bm{x}(t))$, with parameters $\theta$ and $A$. Then,
by plugging in S into the hidden states equation, we get

$$
\frac{d\bm{x}(t)}{dt} = -\left[ \frac{1}{\tau} + f(\bm{x}(t), \bm{I}(t), t, \theta) \right] \bm{x}(t) + f(\bm{x}(t), \bm{I}(t), t, \theta) A
$$

Eq. 1 manifests a novel time-continuous RNN instance with several features and benefits: **Liquid time-constant**.
A neural network with $f$ not only determines the derivative of the hidden state $\bm{x}(t)$, but also serves as an input-dependent varying time-constant ($\tau_{sys} = \frac{\tau}{1 + \tau f(\bm{x}(t), \bm{I}(t), t, \theta)}$) for the learning system

### Algorithm 1: LTC update by fused ODE Solver

---

**Parameters**: $\theta = \{\tau^{(N \times 1)}$ = time-constants, $\gamma^{(N \times 1)}$ = gates, $W^{(N \times N)}$ = weights, $b^{(N \times 1)}$ = biases, $A^{(N \times N)}$ = connectivity, $\bm{I}^{(N \times 1)}$ = input, $\bm{x}^{(N \times 1)}$ = hidden-state, $\bm{y}^{(M \times N)}$ = weights, $\gamma_r^{(M \times N)}$ = recurrennt weights, $\mu^{(N \times 1)}$ = biases $\}$,

---

$$
\mathbb{E}_{W^{(d)}_\|} \mathbb{E}_{W^{(d)}_\perp} \left[ \left( \sum_{i \in A_{W^{(d)}_\|}} \left( \left( ^{\|}W_\perp^{(d)} + ^{\perp}W_\perp^{(d)} \right)_i z_\perp^{(d)} + \left( ^{\|}W_\|^{(d)} + ^{\perp}W_\|^{(d)} \right)_i z_\|^{(d)} \right)^2 \right)^{1/2} \right]
$$

---

$$
\mathbb{E}_{W^{(d)}} \left[\left\| \frac{dz^{(d + 1)}}{dt} \right\| \right] = \mathbb{E}_{W^{(d)}_\|} \mathbb{E}_{W^{(d)}_\perp} \left[ \left( \sum_{i \in A_{W^{(d)}_\|}} \left( \left( ^{\|}W_\perp^{(d)} + ^{\perp}W_\perp^{(d)} \right)_i z_\perp^{(d)} + \left( ^{\|}W_\|^{(d)} + ^{\perp}W_\|^{(d)} \right)_i z_\|^{(d)} \right)^2 \right)^{1/2} \right]
$$

## Abstract

We introduce a new class of time-continuous recurrent neural
network models. Instead of declaring a learning system's dynamics by implicit nonlinearities, we construct networks of
linear first-order dynamical systems modulated via nonlinear
interlinked gates. The resulting models represent dynamical
systems with varying (i.e., liquid) time-constants coupled to
their hidden state, with outputs being computed by numerical differential equation solvers. These neural networks exhibit stable and bounded behavior, yield superior expressivity
within the family of neural ordinary differential equations,
and give rise to improved performance on time-series prediction tasks. To demonstrate these properties, we first take a
theoretical approach to find bounds over their dynamics, and
compute their expressive power by the trajectory length measure in a latent trajectory space. We then conduct a series of
time-series prediction experiments to manifest the approximation capability of Liquid Time-Constant Networks (LTCs)
compared to classical and modern RNNs[^1].

[^1]: Code and data are available at: https://github.com/raminmh/liquid_time_constant_networks

## 1 Introduction

Recurrent neural networks with continuous-time hidden
states determined by ordinary differential equations (ODEs),
are effective algorithms for modeling time series data that
are ubiquitously used in medical, industrial and business settings. The state of a neural ODE, $\bm{x}(t) \in \mathbb{R}^D$,
is defined by the solution of this equation (Chen et al. 2018): $d\bm{x}(t)/dt = f(\bm{x}(t), \bm{I}(t), t, \theta)$, with a neural network $f$ parametrized by
$\theta$. One can then compute the state using a numerical ODE
solver, and train the network by performing reverse-mode
automatic differentiation (Rumelhart, Hinton, and Williams
1986), either by gradient descent through the solver (Lechner et al. 2019), or by considering the solver as a black-box
(Chen et al. 2018; Dupont, Doucet, and Teh 2019; Gholami,
Keutzer, and Biros 2019) and apply the adjoint method (Pontryagin 2018). The open questions are: how expressive are
neural ODEs in their current formalism, and can we improve
their structure to enable richer representation learning and
expressiveness?
Rather than defining the derivatives of the hidden-state
directly by a neural network $f$, one can determine a more
stable continuous-time recurrent neural network (CT-RNN)
by the following equation (Funahashi and Nakamura 1993):
$\frac{d\bm{x}(t)}{dt} = - \frac{\bm{x}(t)}{\tau} + f(\bm{x}(t), \bm{I}(t), t, \theta)$
, in which the term $- \frac{\bm{x}(t)}{\tau}$ assists the autonomous system to reach an equilibrium state
with a time-constant $τ$ . $\bm{x}(t)$ is the hidden state, $\bm{I}(t)$ is the
input, t represents time, and $f$ is parametrized by $θ$.
We propose an alternative formulation: let the hidden state
flow of a network be declared by a system of linear ODEs of
the form: $d\bm{x}(t)/dt = -\bm{x}(t)/τ + \bm{S}(t)$, and let $\bm{S}(t) \in \mathbb{R}^M$
represent the following nonlinearity determined by $\bm{S}(t) = f(\bm{x}(t),\bm{I}(t), t, θ)(A-\bm{x}(t))$, with parameters $\theta$ and $A$. Then,
by plugging in S into the hidden states equation, we get

$$
\frac{d\bm{x}(t)}{dt} = -\left[ \frac{1}{\tau} + f(\bm{x}(t), \bm{I}(t), t, \theta) \right] \bm{x}(t) + f(\bm{x}(t), \bm{I}(t), t, \theta) A
$$

Eq. 1 manifests a novel time-continuous RNN instance with several features and benefits: **Liquid time-constant**.
A neural network with $f$ not only determines the derivative of the hidden state $\bm{x}(t)$, but also serves as an input-dependent varying time-constant ($\tau_{sys} = \frac{\tau}{1 + \tau f(\bm{x}(t), \bm{I}(t), t, \theta)}$) for the learning system

### Algorithm 1: LTC update by fused ODE Solver

---

**Parameters**: $\theta = \{\tau^{(N \times 1)}$ = time-constants, $\gamma^{(N \times 1)}$ = gates, $W^{(N \times N)}$ = weights, $b^{(N \times 1)}$ = biases, $A^{(N \times N)}$ = connectivity, $\bm{I}^{(N \times 1)}$ = input, $\bm{x}^{(N \times 1)}$ = hidden-state, $\bm{y}^{(M \times N)}$ = weights, $\gamma_r^{(M \times N)}$ = recurrennt weights, $\mu^{(N \times 1)}$ = biases $\}$,

---

$$
\mathbb{E}_{W^{(d)}_\|} \mathbb{E}_{W^{(d)}_\perp} \left[ \left( \sum_{i \in A_{W^{(d)}_\|}} \left( \left( ^{\|}W_\perp^{(d)} + ^{\perp}W_\perp^{(d)} \right)_i z_\perp^{(d)} + \left( ^{\|}W_\|^{(d)} + ^{\perp}W_\|^{(d)} \right)_i z_\|^{(d)} \right)^2 \right)^{1/2} \right]
$$

---

$$
\mathbb{E}_{W^{(d)}} \left[\left\| \frac{dz^{(d + 1)}}{dt} \right\| \right] = \mathbb{E}_{W^{(d)}_\|} \mathbb{E}_{W^{(d)}_\perp} \left[ \left( \sum_{i \in A_{W^{(d)}_\|}} \left( \left( ^{\|}W_\perp^{(d)} + ^{\perp}W_\perp^{(d)} \right)_i z_\perp^{(d)} + \left( ^{\|}W_\|^{(d)} + ^{\perp}W_\|^{(d)} \right)_i z_\|^{(d)} \right)^2 \right)^{1/2} \right]
$$
