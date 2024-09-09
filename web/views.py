from django.views import generic


class HomeView(generic.TemplateView):
    template_name = 'index.html'


class DashboardView(generic.TemplateView):
    template_name = 'dashboard.html'


home = HomeView.as_view()
dashboard = DashboardView.as_view()
