import json
from django.http import JsonResponse
from django.views import View
from api.models import Account
from django.contrib.auth import authenticate, login


class LoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data['email']
        password = data['password']

        user = Account.objects.filter(email=email, password=password)

        if len(user) == 0:
            print('Invalid credentials')
            request.session['user_id'] = None
            request.session['email'] = None
            return JsonResponse({'message': 'Invalid credentials', 'error': 'Invalid credentials'})

        request.session['user_id'] = user[0].id
        request.session['email'] = user[0].email

        return JsonResponse({'message': 'Login successful', 'error': None})

        # Authenticate the user
        # account = authenticate(request, username=email, password=password)
        # if account is not None:
        #     login(request, account)  # Log the user in

        #     request.session['user_id'] = account.id
        #     request.session['email'] = account.email

        #     return JsonResponse({'message': 'Login successful'})
        # else:
        #     return JsonResponse({'message': 'Invalid credentials'}, status=401)
